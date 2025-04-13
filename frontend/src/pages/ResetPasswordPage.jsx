import { useState } from "react";
import { motion } from "framer-motion";
import {
  KeyRound,
  Lock,
  UserPlus,
  Loader,
  ArrowLeft,
  User,
} from "lucide-react";
import flower from "../../assets/flower.jpg";
import greenplants from "../../assets/greenplants.webp";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { resetPassword, loading } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ ...formData, token });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 sm:px-2 md:px-6">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={flower} className="py-2 w-90 h-30 rounded-xl mb-3 mx-auto" />
        <h2 className="text-center text-3xl font-bold mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 w-5 h-5" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="password..."
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 w-5 h-5" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Confirm Password..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>
                <KeyRound className="mr-2 h-5 w-5" aria-hidden="true" />
                Reset Password
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
