<template>
  <div class="bg-[#141414] border border-[#2a2a2a] rounded-xl w-full max-w-md p-10 relative max-h-[90vh] overflow-y-auto">

    <!-- Close Button -->
    <button @click="emit('close')"
      class="absolute top-4 right-4 text-[#555] hover:text-yellow-400 text-xl font-bold transition-colors leading-none">
      ✕
    </button>

    <!-- Logo -->
    <div class="text-center mb-8">
      <h1 class="font-black text-yellow-400 text-3xl tracking-widest" style="font-family:'Barlow Condensed',sans-serif">ST TOOLS</h1>
      <p class="text-[#555] text-xs tracking-[3px] uppercase mt-1">Professional Grade</p>
    </div>

    <!-- LOGIN VIEW -->
    <div v-if="view === 'login'">
      <h2 class="text-white font-bold text-xl mb-1">Welcome back</h2>
      <p class="text-[#666] text-sm mb-6">Sign in to your ST account</p>

      <div class="flex bg-[#1a1a1a] border border-[#222] rounded-lg p-1 mb-6">
        <button v-for="tab in ['email','phone']" :key="tab" @click="activeTab = (tab as 'email'|'phone')"
          :class="activeTab === tab ? 'bg-yellow-400 text-black' : 'text-[#555]'"
          class="flex-1 py-2 rounded-md text-sm font-semibold transition-all capitalize">
          {{ tab }}
        </button>
      </div>

      <div v-if="activeTab === 'email'" class="mb-4">
        <label class="st-label">Email address</label>
        <input v-model="form.email" type="email" placeholder="you@example.com" class="st-input" />
      </div>
      <div v-else class="mb-4">
        <label class="st-label">Phone number</label>
        <input v-model="form.phone" type="tel" placeholder="+94 71 234 5678" class="st-input" />
      </div>

      <div class="mb-2">
        <label class="st-label">Password</label>
        <div class="relative">
          <input v-model="form.password" :type="showPw ? 'text' : 'password'"
            placeholder="Enter password" class="st-input pr-14" />
          <button @click="showPw = !showPw"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] text-xs font-semibold">
            {{ showPw ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <div class="text-right mb-4">
        <button @click="view = 'forgot'" class="text-yellow-400 text-xs font-semibold">Forgot password?</button>
      </div>

      <button @click="handleLogin" class="st-btn-primary">Sign In</button>

      <p class="text-center text-[#555] text-sm mt-5">
        Don't have an account?
        <button @click="view = 'signup'" class="text-yellow-400 font-semibold ml-1">Create one</button>
      </p>
    </div>

    <!-- FORGOT PASSWORD VIEW -->
    <div v-else-if="view === 'forgot'">
      <button @click="view = 'login'" class="st-back">&#8592; Back to login</button>
      <h2 class="text-white font-bold text-xl mb-1">Reset password</h2>
      <p class="text-[#666] text-sm mb-6">We'll send a verification code to your email or phone</p>

      <!-- Step 1 -->
      <div v-if="forgotStep === 1">
        <div class="flex bg-[#1a1a1a] border border-[#222] rounded-lg p-1 mb-6">
          <button v-for="tab in ['email','phone']" :key="tab" @click="forgotTab = (tab as 'email'|'phone')"
            :class="forgotTab === tab ? 'bg-yellow-400 text-black' : 'text-[#555]'"
            class="flex-1 py-2 rounded-md text-sm font-semibold transition-all capitalize">
            {{ tab }}
          </button>
        </div>
        <div class="mb-4">
          <label class="st-label">{{ forgotTab === 'email' ? 'Email address' : 'Phone number' }}</label>
          <input v-model="forgotContact" :type="forgotTab === 'email' ? 'email' : 'tel'"
            :placeholder="forgotTab === 'email' ? 'you@example.com' : '+94 71 234 5678'"
            class="st-input" />
        </div>
        <button @click="sendResetCode" class="st-btn-primary">Send Code</button>
      </div>

      <!-- Step 2 -->
      <div v-else-if="forgotStep === 2">
        <div class="bg-[#1a1a0a] border border-[#854f0b] rounded-lg px-4 py-3 text-sm text-yellow-400 mb-4">
          Code sent to {{ forgotContact }}
        </div>
        <label class="st-label mb-3 block">Enter 6-digit code</label>
        <div class="flex gap-2 mb-4">
          <input v-for="(_, i) in 6" :key="i" v-model="otpDigits[i]" maxlength="1"
            @input="otpNext(i)" :ref="(el) => { otpRefs[i] = el as HTMLInputElement }"
            class="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg py-3 text-white text-xl font-bold text-center focus:border-yellow-400 outline-none" />
        </div>
        <p class="text-center text-xs text-[#555] mb-4">
          Didn't get it? <button @click="sendResetCode" class="text-yellow-400 font-semibold">Resend</button>
        </p>
        <button @click="forgotStep = 3" class="st-btn-primary">Verify Code</button>
      </div>

      <!-- Step 3 -->
      <div v-else-if="forgotStep === 3">
        <div class="mb-4">
          <label class="st-label">New password</label>
          <div class="relative">
            <input v-model="form.newPassword" :type="showPw ? 'text' : 'password'"
              placeholder="New password" class="st-input pr-14" />
            <button @click="showPw = !showPw"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] text-xs font-semibold">
              {{ showPw ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="st-label">Confirm new password</label>
          <input v-model="form.confirmPassword" type="password" placeholder="Repeat password" class="st-input" />
        </div>
        <button @click="handleResetPw" class="st-btn-primary">Update Password</button>
        <div v-if="resetSuccess"
          class="mt-4 bg-[#0a1a0f] border border-[#3b6d11] text-[#97c459] rounded-lg px-4 py-3 text-sm">
          Password updated!
          <button @click="view = 'login'; resetSuccess = false" class="text-[#97c459] font-bold ml-1">Sign in</button>
        </div>
      </div>
    </div>

    <!-- SIGN UP VIEW -->
    <div v-else-if="view === 'signup'">
      <button @click="view = 'login'" class="st-back">&#8592; Back to login</button>
      <h2 class="text-white font-bold text-xl mb-1">Create account</h2>
      <p class="text-[#666] text-sm mb-6">Join ST Tools — built to last</p>
      <div class="mb-4">
        <label class="st-label">Full name</label>
        <input v-model="form.name" type="text" placeholder="Your name" class="st-input" />
      </div>
      <div class="mb-4">
        <label class="st-label">Email address</label>
        <input v-model="form.email" type="email" placeholder="you@example.com" class="st-input" />
      </div>
      <div class="mb-4">
        <label class="st-label">Phone number</label>
        <input v-model="form.phone" type="tel" placeholder="+94 71 234 5678" class="st-input" />
      </div>
      <div class="mb-4">
        <label class="st-label">Password</label>
        <div class="relative">
          <input v-model="form.password" :type="showPw ? 'text' : 'password'"
            placeholder="Create password" class="st-input pr-14" />
          <button @click="showPw = !showPw"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] text-xs font-semibold">
            {{ showPw ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      <div class="mb-6">
        <label class="st-label">Confirm password</label>
        <input v-model="form.confirmPassword" type="password" placeholder="Repeat password" class="st-input" />
      </div>
      <button @click="handleSignup" class="st-btn-primary">Create Account</button>
      <p class="text-center text-[#555] text-sm mt-5">
        Already have an account?
        <button @click="view = 'login'" class="text-yellow-400 font-semibold ml-1">Sign in</button>
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits(['close'])

const view = ref<'login' | 'forgot' | 'signup'>('login')
const activeTab = ref<'email' | 'phone'>('email')
const forgotTab = ref<'email' | 'phone'>('email')
const forgotStep = ref(1)
const forgotContact = ref('')
const showPw = ref(false)
const resetSuccess = ref(false)
const otpDigits = ref<string[]>(Array(6).fill(''))
const otpRefs = ref<(HTMLInputElement | null)[]>(Array(6).fill(null))

const form = reactive({
  name: '', email: '', phone: '',
  password: '', confirmPassword: '', newPassword: '',
})

function handleLogin() {
  // TODO: connect to Firebase / backend
}

function sendResetCode() {
  if (!forgotContact.value) return
  forgotStep.value = 2
  // TODO: send OTP via email or SMS
}

function otpNext(i: number) {
  if (otpDigits.value[i] && i < 5) otpRefs.value[i + 1]?.focus()
}

function handleResetPw() {
  if (form.newPassword !== form.confirmPassword) {
    alert('Passwords do not match.')
    return
  }
  resetSuccess.value = true
  // TODO: update password via backend
}

function handleSignup() {
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match.')
    return
  }
  // TODO: register user via backend
}
</script>

<style scoped>
@reference "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap');

.st-label {
  @apply block text-xs font-semibold tracking-wide mb-1.5;
  color: #888;
}
.st-input {
  @apply w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #f0f0f0;
  font-family: 'Barlow', sans-serif;
}
.st-input:focus { border-color: #facc15; }
.st-input::placeholder { color: #444; }
.st-btn-primary {
  @apply w-full py-3 font-bold text-sm rounded-lg transition-colors;
  background: #facc15;
  color: #000;
  font-family: 'Barlow', sans-serif;
}
.st-btn-primary:hover { background: #fde047; }
.st-back {
  @apply flex items-center gap-1 text-sm mb-5 bg-transparent border-none cursor-pointer p-0 transition-colors;
  color: #666;
  font-family: 'Barlow', sans-serif;
}
.st-back:hover { color: #facc15; }
</style>