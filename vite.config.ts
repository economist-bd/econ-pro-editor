import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // আপনার রিপোজিটরির নাম যদি 'econ-pro-editor' হয়, তবে নিচের লাইনটি ঠিক আছে
  base: '/econ-pro-editor/', 
});