import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Store, Mail, Phone, FileText } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface BusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BusinessModal = ({ isOpen, onClose }: BusinessModalProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: currentUser?.email || '',
    imageUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      await addDoc(collection(db, 'shops'), {
        name: formData.name,
        description: formData.description,
        contactInfo: `Phone: ${formData.phone} | Email: ${formData.email}`,
        ownerId: currentUser.uid,
        status: 'pending',
        imageUrl: formData.imageUrl,
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({ name: '', description: '', phone: '', email: currentUser?.email || '', imageUrl: '' });
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting shop:", error);
      setErrorMsg(error.message || 'Failed to submit business listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          {success ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Store size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
              <p className="text-white/60">
                Your business listing is now pending verification. Our team will review the details shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Store className="text-gold" />
                  List Your Business
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-white/60" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Shop Name</label>
                  <div className="relative">
                    <Store size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      required
                      type="text"
                      placeholder="Enter your shop name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold text-white text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Description</label>
                  <div className="relative">
                    <FileText size={18} className="absolute left-4 top-4 text-white/40" />
                    <textarea
                      required
                      rows={3}
                      placeholder="What does your shop sell?"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold text-white text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Phone</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold text-white text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Email</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        required
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold text-white text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Store Front Image URL</label>
                  <div className="relative">
                    <Store size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      required
                      type="url"
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold text-white text-sm rounded-xl pl-11 pr-4 py-3.5 transition-all outline-none"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="text-red-400 text-sm font-semibold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-8 bg-gold hover:bg-gold-dark text-black font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit for Verification"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BusinessModal;
