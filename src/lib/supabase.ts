// Supabase client configuration for newsletters and forms only
import { createClient } from '@supabase/supabase-js';

// Email/Newsletter Supabase Environment Variables 
const emailSupabaseUrl = process.env.SUPABASE_URL;
const emailSupabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Validate email Supabase environment variables
if (!emailSupabaseUrl || !emailSupabaseAnonKey) {
  console.warn('Missing email Supabase environment variables. Newsletter and form features may not work.');
}

// Client for email/newsletter operations only
export const supabase = emailSupabaseUrl && emailSupabaseAnonKey 
  ? createClient(emailSupabaseUrl, emailSupabaseAnonKey)
  : null;

// Newsletter subscription interface
export interface NewsletterSubscription {
  id?: string;
  email: string;
  subscribed_at?: string;
  is_active?: boolean;
}

// Contact form interface  
export interface ContactForm {
  id?: string;
  name: string;
  email: string;
  message: string;
  submitted_at?: string;
}

// Newsletter service (email Supabase only)
export class NewsletterService {
  static async subscribe(email: string) {
    if (!supabase) {
      console.error('Newsletter service not available - missing Supabase configuration');
      return { success: false, error: 'Service not available' };
    }

    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{
          email: email,
          subscribed_at: new Date().toISOString(),
          is_active: true
        }]);

      if (error) {
        console.error('Newsletter subscription error:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Newsletter service error:', error);
      return { success: false, error };
    }
  }

  static async unsubscribe(email: string) {
    if (!supabase) {
      return { success: false, error: 'Service not available' };
    }

    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .update({ is_active: false })
        .eq('email', email);

      if (error) {
        console.error('Newsletter unsubscribe error:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      return { success: false, error };
    }
  }
}

// Contact form service (email Supabase only)
export class ContactService {
  static async submitForm(form: ContactForm) {
    if (!supabase) {
      console.error('Contact service not available - missing Supabase configuration');
      return { success: false, error: 'Service not available' };
    }

    try {
      const { data, error } = await supabase
        .from('contact_forms')
        .insert([{
          name: form.name,
          email: form.email,
          message: form.message,
          submitted_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Contact form submission error:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Contact form service error:', error);
      return { success: false, error };
    }
  }
}
