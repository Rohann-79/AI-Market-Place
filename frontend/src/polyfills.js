import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = Buffer;
window.process = process;

// Set default process.env
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Polyfill for process.version
if (!window.process.version) {
  window.process.version = '';
}

// Polyfill for process.platform
if (!window.process.platform) {
  window.process.platform = 'browser';
}

// Polyfill for process.browser
if (!window.process.browser) {
  window.process.browser = true;
} 