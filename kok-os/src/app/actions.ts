'use server';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase Client (Service Role for Admin access if needed, or Anon if RLS permits)
// Using Anon key for now, assuming RLS allows INSERTs for public.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

export async function submitIntake(data: any) {
    const result = { success: false, message: '' };

    if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials missing.');
        return { success: false, message: 'Veritabanı bağlantısı yapılandırlmamış.' };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from('intakes')
            .insert([
                {
                    business_name: data.answers.businessName,
                    contact_email: data.answers.email,
                    payload: data,
                    status: 'pending'
                }
            ]);

        if (dbError) {
            console.error('Supabase Error:', dbError);
            throw new Error('Veritabanına kayıt başarısız.');
        }

        // 2. Send Email via Resend (if configured)
        if (resendApiKey) {
            try {
                const resend = new Resend(resendApiKey);

                // Admin Notification
                await resend.emails.send({
                    from: 'KOK-OS System <onboarding@resend.dev>', // Update with your verified domain
                    to: 'bahdevpro@gmail.com', // The user's email from previous context (or passed as env var)
                    subject: `Yeni Sistem Başlatma Talebi: ${data.answers.businessName}`,
                    html: `
          <h1>Yeni Müşteri Adayı</h1>
          <p><strong>İşletme:</strong> ${data.answers.businessName}</p>
          <p><strong>İletişim:</strong> ${data.answers.contactPerson} (${data.answers.email})</p>
          <p><strong>Telefon:</strong> ${data.answers.phone}</p>
          <p><strong>Hedef:</strong> ${Array.isArray(data.answers.goal) ? data.answers.goal.join(', ') : data.answers.goal}</p>
          <hr />
          <p>Detaylı veri Supabase 'intakes' tablosuna kaydedildi.</p>
        `
                });
            } catch (emailError) {
                console.error('Email sending failed, but DB saved:', emailError);
                // We don't throw here, just log it. The primary goal (data saving) is complete.
            }
        }

        result.success = true;
        result.message = 'Sistem kurulum talebiniz başarıyla alındı. Yönetici onayı bekleniyor.';

    } catch (error: any) {
        console.error('Submission error details:', error);
        // Return the specific error message to the client for debugging
        result.message = `Hata Detayı: ${error.message || JSON.stringify(error)}`;
    }

    return result;
}
