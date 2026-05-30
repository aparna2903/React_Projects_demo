const generateBtn = document.getElementById('generate-btn');
const layoutSelect = document.getElementById('layout-select');
const previewArea = document.getElementById('preview-area');
const showCodeBtn = document.getElementById('show-code-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const copyCodeBtn = document.getElementById('copy-code-btn');
const codeModal = document.getElementById('code-modal');
const codeOutput = document.getElementById('code-output');

let currentLayoutCode = '';

// --- Layout Templates ---
const layouts = {
  hero: `
<div class="text-center bg-gray-900 py-20 px-6 rounded-lg fade-in">
    <h1 class="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
        Build Modern Websites Faster
    </h1>
    <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
        Harness the power of Tailwind CSS with our professionally designed, ready-to-use components.
    </p>
    <div class="flex justify-center space-x-4">
        <a href="#" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105">
            Get Started
        </a>
        <a href="#" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition">
            Learn More
        </a>
    </div>
</div>`,
  pricing: `
<div class="bg-gray-900 py-12 fade-in">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-extrabold text-white">Flexible Pricing Plans</h2>
            <p class="mt-4 text-lg text-gray-400">Choose the plan that's right for your project.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Basic Plan -->
            <div class="bg-gray-800 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <h3 class="text-2xl font-semibold text-white">Basic</h3>
                <p class="mt-4 text-gray-400">For personal projects & startups.</p>
                <div class="mt-6">
                    <span class="text-5xl font-extrabold text-white">$29</span>
                    <span class="text-base font-medium text-gray-400">/mo</span>
                </div>
                <ul class="mt-6 space-y-4 text-gray-300">
                    <li class="flex items-center"><svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>10 Components</li>
                    <li class="flex items-center"><svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Community Support</li>
                </ul>
                <a href="#" class="mt-8 block w-full bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-lg font-semibold">Choose Plan</a>
            </div>
            <!-- Pro Plan -->
            <div class="bg-indigo-600 rounded-2xl p-8 ring-4 ring-indigo-500 ring-opacity-50 transform scale-105">
                <h3 class="text-2xl font-semibold text-white">Pro</h3>
                <p class="mt-4 text-indigo-200">For growing businesses & professionals.</p>
                <div class="mt-6">
                    <span class="text-5xl font-extrabold text-white">$99</span>
                    <span class="text-base font-medium text-indigo-200">/mo</span>
                </div>
                <ul class="mt-6 space-y-4 text-white">
                    <li class="flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Unlimited Components</li>
                    <li class="flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Priority Support</li>
                    <li class="flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>All Pro Features</li>
                </ul>
                <a href="#" class="mt-8 block w-full bg-white hover:bg-indigo-100 text-indigo-600 text-center py-3 rounded-lg font-semibold">Choose Plan</a>
            </div>
            <!-- Enterprise Plan -->
            <div class="bg-gray-800 rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <h3 class="text-2xl font-semibold text-white">Enterprise</h3>
                <p class="mt-4 text-gray-400">For large-scale applications.</p>
                <div class="mt-6">
                    <span class="text-4xl font-extrabold text-white">Contact Us</span>
                </div>
                <ul class="mt-6 space-y-4 text-gray-300">
                    <li class="flex items-center"><svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Dedicated Infrastructure</li>
                    <li class="flex items-center"><svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>24/7 Premium Support</li>
                </ul>
                <a href="#" class="mt-8 block w-full bg-gray-700 hover:bg-gray-600 text-white text-center py-3 rounded-lg font-semibold">Contact Sales</a>
            </div>
        </div>
    </div>
</div>`,
  contact: `
<div class="bg-gray-900 py-12 fade-in">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div class="md:grid md:grid-cols-2">
                <div class="p-8 md:p-12">
                    <h2 class="text-2xl font-bold text-white">Get in Touch</h2>
                    <p class="mt-2 text-gray-400">We'd love to hear from you. Fill out the form and we'll get back to you shortly.</p>
                    <form class="mt-8 space-y-6">
                        <div>
                            <label for="name" class="sr-only">Name</label>
                            <input type="text" name="name" id="name" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Name">
                        </div>
                        <div>
                            <label for="email" class="sr-only">Email</label>
                            <input type="email" name="email" id="email" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Email">
                        </div>
                        <div>
                            <label for="message" class="sr-only">Message</label>
                            <textarea name="message" id="message" rows="4" class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your Message"></textarea>
                        </div>
                        <div>
                            <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition">Send Message</button>
                        </div>
                    </form>
                </div>
                <div class="bg-indigo-600 p-8 md:p-12 text-white">
                    <h3 class="text-xl font-bold">Contact Information</h3>
                    <p class="mt-4 text-indigo-100">123 Design Street<br>New York, NY 10001</p>
                    <p class="mt-4 text-indigo-100">hello@layoutgen.pro</p>
                    <p class="mt-4 text-indigo-100">+1 (555) 123-4567</p>
                </div>
            </div>
        </div>
    </div>
</div>`,
  features: `
<div class="bg-gray-900 py-16 sm:py-24 fade-in">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
            <h2 class="text-base font-semibold leading-7 text-indigo-400">Build Faster</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything you need to deploy your app</p>
            <p class="mt-6 text-lg leading-8 text-gray-300">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div class="flex flex-col">
                    <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                        <svg class="h-5 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046a3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clip-rule="evenodd" /></svg>
                        Push to deploy
                    </dt>
                    <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                        <p class="flex-auto">Commodo nec sagittis tortor mauris sed. Turpis tortor quis scelerisque diam id accumsan nullam tempus. Pulvinar etiam lacus volutpat eu. Phasellus praesent ligula sit faucibus.</p>
                    </dd>
                </div>
                <div class="flex flex-col">
                    <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                        <svg class="h-5 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" /></svg>
                        SSL certificates
                    </dt>
                    <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                        <p class="flex-auto">Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.</p>
                    </dd>
                </div>
                <div class="flex flex-col">
                    <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                        <svg class="h-5 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" /><path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 010 1.5h-.01a.75.75 0 01-.75-.75z" clip-rule="evenodd" /></svg>
                        Simple queues
                    </dt>
                    <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                        <p class="flex-auto">Pellentesque sit elit congue ante nec amet. Dolor aenean curabitur viverra suspendisse iaculis eget. Nec mollis placerat ultricies euismod.</p>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</div>`,
  testimonial: `
<section class="bg-gray-900 py-12 fade-in">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-xl text-center">
            <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-400">Testimonials</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">We have worked with thousands of amazing people</p>
        </div>
        <div class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div class="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
                <div class="pt-8 sm:inline-block sm:w-full sm:px-4">
                    <figure class="rounded-2xl bg-gray-800 p-8 text-sm leading-6">
                        <blockquote class="text-gray-300">
                            <p>“This tool is a game-changer. I can now prototype and build layouts in a fraction of the time. The generated code is clean and easy to customize.”</p>
                        </blockquote>
                        <figcaption class="mt-6 flex items-center gap-x-4">
                            <img class="h-10 w-10 rounded-full bg-gray-700" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" onerror="this.onerror=null;this.src='https://placehold.co/256x256/374151/9ca3af?text=User';">
                            <div>
                                <div class="font-semibold text-white">Sarah Dayan</div>
                                <div class="text-gray-400">@sarahdayan</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div class="pt-8 sm:inline-block sm:w-full sm:px-4">
                    <figure class="rounded-2xl bg-gray-800 p-8 text-sm leading-6">
                        <blockquote class="text-gray-300">
                            <p>“The premium feel of the components is outstanding. My clients are always impressed with the final result. Highly recommended!”</p>
                        </blockquote>
                        <figcaption class="mt-6 flex items-center gap-x-4">
                            <img class="h-10 w-10 rounded-full bg-gray-700" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" onerror="this.onerror=null;this.src='https://placehold.co/256x256/374151/9ca3af?text=User';">
                            <div>
                                <div class="font-semibold text-white">Jane Cooper</div>
                                <div class="text-gray-400">@janecooper</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div class="pt-8 sm:inline-block sm:w-full sm:px-4">
                    <figure class="rounded-2xl bg-gray-800 p-8 text-sm leading-6">
                        <blockquote class="text-gray-300">
                            <p>“Incredible! The attention to detail in the design and the responsiveness of the layouts are top-notch. Saves me hours of work.”</p>
                        </blockquote>
                        <figcaption class="mt-6 flex items-center gap-x-4">
                            <img class="h-10 w-10 rounded-full bg-gray-700" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" onerror="this.onerror=null;this.src='https://placehold.co/256x256/374151/9ca3af?text=User';">
                            <div>
                                <div class="font-semibold text-white">John Doe</div>
                                <div class="text-gray-400">@johndoe</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</section>`,
  footer: `
<footer class="bg-gray-800 text-white fade-in">
    <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            <div class="pb-6">
                <a href="#" class="text-sm leading-6 text-gray-300 hover:text-indigo-400">About</a>
            </div>
            <div class="pb-6">
                <a href="#" class="text-sm leading-6 text-gray-300 hover:text-indigo-400">Blog</a>
            </div>
            <div class="pb-6">
                <a href="#" class="text-sm leading-6 text-gray-300 hover:text-indigo-400">Jobs</a>
            </div>
            <div class="pb-6">
                <a href="#" class="text-sm leading-6 text-gray-300 hover:text-indigo-400">Press</a>
            </div>
            <div class="pb-6">
                <a href="#" class="text-sm leading-6 text-gray-300 hover:text-indigo-400">Partners</a>
            </div>
        </nav>
        <div class="mt-10 flex justify-center space-x-10">
            <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd" /></svg>
            </a>
        </div>
        <p class="mt-10 text-center text-xs leading-5 text-gray-500">© 2025 LayoutGen Pro, Inc. All rights reserved.</p>
    </div>
</footer>`,
};

// --- Event Listeners ---
generateBtn.addEventListener('click', () => {
  const selectedLayout = layoutSelect.value;
  currentLayoutCode = layouts[selectedLayout].trim();
  previewArea.innerHTML = currentLayoutCode;
});

showCodeBtn.addEventListener('click', () => {
  if (!currentLayoutCode) {
    alert('Please generate a layout first!');
    return;
  }
  codeOutput.textContent = currentLayoutCode;
  codeModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  codeModal.classList.add('hidden');
});

copyCodeBtn.addEventListener('click', () => {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = currentLayoutCode;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  try {
    // Use execCommand as a fallback for broader browser support in iFrames
    document.execCommand('copy');
    copyCodeBtn.textContent = 'Copied!';
    copyCodeBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
    copyCodeBtn.classList.add('bg-blue-600');
  } catch (err) {
    console.error('Failed to copy: ', err);
    copyCodeBtn.textContent = 'Copy Failed';
    copyCodeBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
    copyCodeBtn.classList.add('bg-red-600');
  }
  document.body.removeChild(tempTextArea);

  setTimeout(() => {
    copyCodeBtn.textContent = 'Copy to Clipboard';
    copyCodeBtn.classList.remove('bg-blue-600', 'bg-red-600');
    copyCodeBtn.classList.add('bg-green-600', 'hover:bg-green-700');
  }, 2000);
});

// Close modal on escape key press
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !codeModal.classList.contains('hidden')) {
    codeModal.classList.add('hidden');
  }
});

// Close modal on outside click
codeModal.addEventListener('click', (e) => {
  if (e.target === codeModal) {
    codeModal.classList.add('hidden');
  }
});