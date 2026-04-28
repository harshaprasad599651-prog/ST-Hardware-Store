<template>
  <div
    class="border rounded-xl w-full max-w-md p-10 relative max-h-[90vh] overflow-y-auto transition-colors duration-300"
    :class="isLight ? 'bg-white border-gray-200 shadow-xl' : 'bg-[#141414] border-[#2a2a2a]'"
  >
    <!-- Close Button -->
    <button @click="emit('close')"
      class="absolute top-4 right-4 text-xl font-bold transition-colors leading-none"
      :class="isLight ? 'text-gray-400 hover:text-yellow-600' : 'text-[#555] hover:text-yellow-400'">
      ✕
    </button>

    <!-- Logo -->
    <div class="text-center mb-8">
      <h1 class="font-black text-3xl tracking-widest"
        :class="isLight ? 'text-yellow-600' : 'text-yellow-400'"
        style="font-family:'Barlow Condensed',sans-serif">ST TOOLS</h1>
      <p class="text-xs tracking-[3px] uppercase mt-1"
        :class="isLight ? 'text-gray-400' : 'text-[#555]'">Professional Grade</p>
    </div>

    <!-- LOGIN VIEW -->
    <div v-if="view === 'login'">
      <h2 class="font-bold text-xl mb-1" :class="isLight ? 'text-gray-800' : 'text-white'">Welcome back</h2>
      <p class="text-sm mb-6" :class="isLight ? 'text-gray-500' : 'text-[#666]'">Sign in to your ST account</p>

      <div class="flex rounded-lg p-1 mb-6"
        :class="isLight ? 'bg-gray-100 border border-gray-200' : 'bg-[#1a1a1a] border border-[#222]'">
        <button v-for="tab in ['email','phone']" :key="tab"
          @click="activeTab = (tab as 'email'|'phone')"
          :class="activeTab === tab ? 'bg-yellow-400 text-black' : isLight ? 'text-gray-400' : 'text-[#555]'"
          class="flex-1 py-2 rounded-md text-sm font-semibold transition-all capitalize">
          {{ tab }}
        </button>
      </div>

      <div v-if="activeTab === 'email'" class="mb-4">
        <label :class="labelClass">Email address</label>
        <input v-model="form.email" type="email" placeholder="you@example.com" :class="inputClass" />
      </div>
      <div v-else class="mb-4">
        <label :class="labelClass">Phone number</label>
        <input v-model="form.phone" type="tel" placeholder="+94 71 234 5678" :class="inputClass" />
      </div>

      <div class="mb-2">
        <label :class="labelClass">Password</label>
        <div class="relative">
          <input v-model="form.password" :type="showPw ? 'text' : 'password'"
            placeholder="Enter password" :class="inputClass + ' pr-14'" />
          <button @click="showPw = !showPw"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold"
            :class="isLight ? 'text-gray-400' : 'text-[#555]'">
            {{ showPw ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <div class="text-right mb-4">
        <button @click="view = 'forgot'"
          :class="isLight ? 'text-yellow-600' : 'text-yellow-400'"
          class="text-xs font-semibold">Forgot password?</button>
      </div>

      <button @click="handleLogin" :class="btnClass">Sign In</button>

      <p class="text-center text-sm mt-5" :class="isLight ? 'text-gray-400' : 'text-[#555]'">
        Don't have an account?
        <button @click="view = 'signup'"
          :class="isLight ? 'text-yellow-600' : 'text-yellow-400'"
          class="font-semibold ml-1">Create one</button>
      </p>
    </div>

    <!-- FORGOT PASSWORD VIEW -->
    <div v-else-if="view === 'forgot'">
      <button @click="view = 'login'" :class="backClass">&#8592; Back to login</button>
      <h2 class="font-bold text-xl mb-1" :class="isLight ? 'text-gray-800' : 'text-white'">Reset password</h2>
      <p class="text-sm mb-6" :class="isLight ? 'text-gray-500' : 'text-[#666]'">We'll send a verification code to your email or phone</p>

      <div v-if="forgotStep === 1">
        <div class="flex rounded-lg p-1 mb-6"
          :class="isLight ? 'bg-gray-100 border border-gray-200' : 'bg-[#1a1a1a] border border-[#222]'">
          <button v-for="tab in ['email','phone']" :key="tab"
            @click="forgotTab = (tab as 'email'|'phone')"
            :class="forgotTab === tab ? 'bg-yellow-400 text-black' : isLight ? 'text-gray-400' : 'text-[#555]'"
            class="flex-1 py-2 rounded-md text-sm font-semibold transition-all capitalize">
            {{ tab }}
          </button>
        </div>
        <div class="mb-4">
          <label :class="labelClass">{{ forgotTab === 'email' ? 'Email address' : 'Phone number' }}</label>
          <input v-model="forgotContact" :type="forgotTab === 'email' ? 'email' : 'tel'"
            :placeholder="forgotTab === 'email' ? 'you@example.com' : '+94 71 234 5678'"
            :class="inputClass" />
        </div>
        <button @click="sendResetCode" :class="btnClass">Send Code</button>
      </div>

      <div v-else-if="forgotStep === 2">
        <div class="rounded-lg px-4 py-3 text-sm mb-4"
          :class="isLight ? 'bg-yellow-50 border border-yellow-300 text-yellow-700' : 'bg-[#1a1a0a] border border-[#854f0b] text-yellow-400'">
          Code sent to {{ forgotContact }}
        </div>
        <label :class="labelClass + ' mb-3 block'">Enter 6-digit code</label>
        <div class="flex gap-2 mb-4">
          <input v-for="(_, i) in 6" :key="i" v-model="otpDigits[i]" maxlength="1"
            @input="otpNext(i)" :ref="(el) => { otpRefs[i] = el as HTMLInputElement }"
            class="flex-1 rounded-lg py-3 text-xl font-bold text-center outline-none transition-colors"
            :class="isLight ? 'bg-gray-100 border border-gray-300 text-gray-800 focus:border-yellow-500' : 'bg-[#1a1a1a] border border-[#2a2a2a] text-white focus:border-yellow-400'" />
        </div>
        <p class="text-center text-xs mb-4" :class="isLight ? 'text-gray-400' : 'text-[#555]'">
          Didn't get it?
          <button @click="sendResetCode" :class="isLight ? 'text-yellow-600' : 'text-yellow-400'" class="font-semibold">Resend</button>
        </p>
        <button @click="forgotStep = 3" :class="btnClass">Verify Code</button>
      </div>

      <div v-else-if="forgotStep === 3">
        <div class="mb-4">
          <label :class="labelClass">New password</label>
          <div class="relative">
            <input v-model="form.newPassword" :type="showPw ? 'text' : 'password'"
              placeholder="New password" :class="inputClass + ' pr-14'" />
            <button @click="showPw = !showPw"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold"
              :class="isLight ? 'text-gray-400' : 'text-[#555]'">
              {{ showPw ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label :class="labelClass">Confirm new password</label>
          <input v-model="form.confirmPassword" type="password" placeholder="Repeat password" :class="inputClass" />
        </div>
        <button @click="handleResetPw" :class="btnClass">Update Password</button>
        <div v-if="resetSuccess" class="mt-4 rounded-lg px-4 py-3 text-sm"
          :class="isLight ? 'bg-green-50 border border-green-300 text-green-700' : 'bg-[#0a1a0f] border border-[#3b6d11] text-[#97c459]'">
          Password updated!
          <button @click="view = 'login'; resetSuccess = false" class="font-bold ml-1">Sign in</button>
        </div>
      </div>
    </div>

    <!-- SIGN UP VIEW -->
    <div v-else-if="view === 'signup'">
      <button @click="view = 'login'" :class="backClass">&#8592; Back to login</button>
      <h2 class="font-bold text-xl mb-1" :class="isLight ? 'text-gray-800' : 'text-white'">Create account</h2>
      <p class="text-sm mb-6" :class="isLight ? 'text-gray-500' : 'text-[#666]'">Join ST Tools — built to last</p>
      <div class="mb-4">
        <label :class="labelClass">Full name</label>
        <input v-model="form.name" type="text" placeholder="Your name" :class="inputClass" />
      </div>
      <div class="mb-4">
        <label :class="labelClass">Email address</label>
        <input v-model="form.email" type="email" placeholder="you@example.com" :class="inputClass" />
      </div>
      <div class="mb-4">
        <label :class="labelClass">Phone number</label>
        <input v-model="form.phone" type="tel" placeholder="+94 71 234 5678" :class="inputClass" />
      </div>
      <div class="mb-4">
        <label :class="labelClass">Password</label>
        <div class="relative">
          <input v-model="form.password" :type="showPw ? 'text' : 'password'"
            placeholder="Create password" :class="inputClass + ' pr-14'" />
          <button @click="showPw = !showPw"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold"
            :class="isLight ? 'text-gray-400' : 'text-[#555]'">
            {{ showPw ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>
      <div class="mb-6">
        <label :class="labelClass">Confirm password</label>
        <input v-model="form.confirmPassword" type="password" placeholder="Repeat password" :class="inputClass" />
      </div>
      <button @click="handleSignup" :class="btnClass">Create Account</button>
      <p class="text-center text-sm mt-5" :class="isLight ? 'text-gray-400' : 'text-[#555]'">
        Already have an account?
        <button @click="view = 'login'" :class="isLight ? 'text-yellow-600' : 'text-yellow-400'" class="font-semibold ml-1">Sign in</button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useTheme } from '../../composables/useTheme'

const emit = defineEmits(['close'])
const { isLight } = useTheme()

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

const labelClass = computed(() =>
  `block text-xs font-semibold tracking-wide mb-1.5 ${isLight.value ? 'text-gray-500' : 'text-[#888]'}`
)

const inputClass = computed(() =>
  `w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all border ${
    isLight.value
      ? 'bg-gray-50 border-gray-200 text-gray-800 focus:border-yellow-500 placeholder:text-gray-300'
      : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#f0f0f0] focus:border-yellow-400 placeholder:text-[#444]'
  }`
)

const btnClass = computed(() =>
  'w-full py-3 font-bold text-sm rounded-lg transition-colors bg-yellow-400 hover:bg-yellow-300 text-black'
)

const backClass = computed(() =>
  `flex items-center gap-1 text-sm mb-5 bg-transparent border-none cursor-pointer p-0 transition-colors ${
    isLight.value ? 'text-gray-400 hover:text-yellow-600' : 'text-[#666] hover:text-yellow-400'
  }`
)

function handleLogin() {}
function sendResetCode() {
  if (!forgotContact.value) return
  forgotStep.value = 2
}
function otpNext(i: number) {
  if (otpDigits.value[i] && i < 5) otpRefs.value[i + 1]?.focus()
}
function handleResetPw() {
  if (form.newPassword !== form.confirmPassword) { alert('Passwords do not match.'); return }
  resetSuccess.value = true
}
function handleSignup() {
  if (form.password !== form.confirmPassword) { alert('Passwords do not match.'); return }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;900&family=Barlow+Condensed:wght@700;900&display=swap');
@reference "tailwindcss";
</style>