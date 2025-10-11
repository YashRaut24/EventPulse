import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

function Contact() {
  return (
    <section className="contact-section bg-gradient-to-b from-black to-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Get in Touch
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Have questions, suggestions, or want to collaborate? We’d love to hear from you. Reach out through any of the channels below or send us a message directly.
          </p>

          <div className="space-y-4">
            <div className="contact-info-card">
              <Mail className="text-cyan-400 w-6 h-6" />
              <span>support@eventpulse.com</span>
            </div>
            <div className="contact-info-card">
              <Phone className="text-purple-400 w-6 h-6" />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-info-card">
              <MapPin className="text-pink-400 w-6 h-6" />
              <span>Mumbai, India</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="contact-form bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 space-y-6"
        >
          <div>
            <label className="text-white font-semibold mb-2 block">Your Name</label>
            <input type="text" placeholder="John Doe" className="contact-input" />
          </div>

          <div>
            <label className="text-white font-semibold mb-2 block">Your Email</label>
            <input type="email" placeholder="you@example.com" className="contact-input" />
          </div>

          <div>
            <label className="text-white font-semibold mb-2 block">Message</label>
            <textarea placeholder="Type your message..." rows="5" className="contact-textarea"></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-btn flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
          >
            <Send className="w-5 h-5" /> Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;
