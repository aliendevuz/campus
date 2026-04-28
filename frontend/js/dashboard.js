/* ============================================
   js/dashboard.js — Dashboard specific interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. Toast Notification System
     ========================================== */
  const createToastContainer = () => {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        z-index: 9999;
      `;
      document.body.appendChild(container);
    }
    return container;
  };

  const showToast = (message, type = 'info') => {
    const container = createToastContainer();
    const toast = document.createElement('div');
    
    const bgColors = {
      info: 'var(--clr-surface-2)',
      success: 'var(--clr-green)',
      warning: 'var(--clr-accent-warm)'
    };
    const textColors = {
      info: 'var(--clr-text)',
      success: '#000',
      warning: '#000'
    };

    toast.style.cssText = `
      background: ${bgColors[type] || bgColors.info};
      color: ${textColors[type] || textColors.info};
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid var(--clr-border);
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      font-size: 14px;
      font-weight: 500;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️'}</span> ${message}`;
    
    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);

    // Animate out
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  /* ==========================================
     2. Modal System Implementation
     ========================================== */
  const openModal = (title, bodyContent) => {
    // Check if overlay exists
    let overlay = document.querySelector('.modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);

      // Close modal on click outside
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          setTimeout(() => overlay.innerHTML = '', 300);
        }
      });
    }

    // Build modal HTML
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form class="modal-form">
          <div class="modal-body">
            ${bodyContent}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--outline modal-cancel">Cancel</button>
            <button type="submit" class="btn btn--primary">Confirm</button>
          </div>
        </form>
      </div>
    `;

    // Show modal
    requestAnimationFrame(() => overlay.classList.add('active'));

    // Handle Close
    const closeBtn = overlay.querySelector('.modal-close');
    const cancelBtn = overlay.querySelector('.modal-cancel');
    const closeAction = () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.innerHTML = '', 300);
    };
    closeBtn.addEventListener('click', closeAction);
    cancelBtn.addEventListener('click', closeAction);

    // Handle Submit
    const form = overlay.querySelector('.modal-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAction();
      showToast(`${title} request submitted successfully!`, 'success');
    });
  };

  /* ==========================================
     3. Make Elements Interactable
     ========================================== */
  
  // All regular buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Allow modal buttons or links to work normally
      if (btn.classList.contains('modal-cancel') || btn.closest('.modal-content') || btn.tagName === 'A') return;
      
      e.preventDefault();
      const text = btn.textContent.trim();
      
      // Simple click effect
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => btn.style.transform = '', 150);

      // Check specific buttons to open modals
      if (text.includes('Pre-order')) {
        openModal('Pre-order Food', `
          <label>Select Item</label>
          <select>
            <option>Grilled Chicken Bowl - $6.50</option>
            <option>Vegan Wrap - $5.00</option>
            <option>Classic Burger & Fries - $7.00</option>
          </select>
          <label style="margin-top:12px;">Pickup Time</label>
          <input type="time" value="12:30" />
        `);
      } else if (text.includes('Sign Up') || text.includes('RSVP')) {
        showToast(`Successfully registered!`, 'success');
        btn.textContent = 'Enrolled';
        btn.classList.remove('btn--primary');
        btn.classList.add('btn--outline');
      } else if (text.includes('Yes') || text.includes('No')) {
        showToast('Your vote has been recorded.', 'success');
      } else {
        showToast(`Action triggered: ${text}`);
      }
    });
  });

  // Action Grid Buttons (Quick Actions)
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.style.transform = 'scale(0.95)';
      setTimeout(() => this.style.transform = '', 150);
      
      const text = this.querySelector('span:not(.action-icon)') ? this.querySelector('span:not(.action-icon)').textContent.trim() : this.textContent.trim();
      
      if (text.includes('Book Study Room')) {
        openModal('Book Study Room', `
          <label>Date</label>
          <input type="date" />
          <label style="margin-top:12px;">Duration</label>
          <select><option>1 Hour</option><option>2 Hours</option><option>3 Hours</option></select>
          <label style="margin-top:12px;">Capacity</label>
          <select><option>1-2 People</option><option>3-5 People</option><option>6+ People</option></select>
        `);
      } else if (text.includes('Pre-order Food')) {
        openModal('Pre-order Food', `
          <label>Select Item</label>
          <select>
            <option>Grilled Chicken Bowl - $6.50</option>
            <option>Vegan Wrap - $5.00</option>
            <option>Classic Burger & Fries - $7.00</option>
          </select>
          <label style="margin-top:12px;">Pickup Time</label>
          <input type="time" value="12:30" />
        `);
      } else if (text.includes('Consult Prof') || text.includes('Contact Advisor')) {
        openModal('Request Consultation', `
          <label>Message / Topic</label>
          <textarea placeholder="Briefly describe what you'd like to discuss..."></textarea>
          <label style="margin-top:12px;">Preferred Availability</label>
          <select><option>Morning (9 AM - 12 PM)</option><option>Afternoon (1 PM - 4 PM)</option></select>
        `);
      } else if (text.includes('Request Docs') || text.includes('Request Transcript')) {
        openModal('Request Document', `
          <label>Document Type</label>
          <select>
            <option>Official Transcript</option>
            <option>Proof of Enrollment</option>
            <option>Diploma Copy</option>
          </select>
          <label style="margin-top:12px;">Delivery Method</label>
          <select><option>Digital (PDF to Email)</option><option>Printed (Pick up at Admin)</option></select>
        `);
      } else {
        showToast(`Opening: ${text}`);
      }
    });
  });

  // Form links (e.g. "View Full", "See all", etc.)
  document.querySelectorAll('.form-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if(link.getAttribute('href') === '#') {
        e.preventDefault();
        const text = link.textContent.trim();
        
        if (text.includes('Request Official Documents') || text.includes('Request Transcript')) {
          openModal('Request Document', `
            <label>Document Type</label>
            <select>
              <option>Official Transcript</option>
              <option>Proof of Enrollment</option>
              <option>Diploma Copy</option>
            </select>
            <label style="margin-top:12px;">Delivery Method</label>
            <select><option>Digital (PDF to Email)</option><option>Printed (Pick up at Admin)</option></select>
          `);
        } else if (text.includes('Pay Dorm Fees')) {
          openModal('Pay Dorm Fees', `
            <label>Payment Amount</label>
            <input type="text" value="$450.00" disabled />
            <label style="margin-top:12px;">Payment Method</label>
            <select>
              <option>Credit/Debit Card (ending in 1234)</option>
              <option>Bank Transfer</option>
            </select>
          `);
        } else if (text.includes('Track Document Status')) {
          openModal('Document Status', `
            <div style="padding:12px; background:var(--clr-surface-2); border-radius:4px;">
              <strong>Proof of Enrollment</strong><br/>
              Status: <span style="color:var(--clr-green);">Ready for pickup</span>
            </div>
            <div style="padding:12px; background:var(--clr-surface-2); border-radius:4px; margin-top:8px;">
              <strong>Official Transcript</strong><br/>
              Status: <span style="color:var(--clr-accent-warm);">Processing (Est. 2 days)</span>
            </div>
          `);
        } else if (text.includes('Book Consult')) {
          openModal('Request Consultation', `
            <label>Message / Topic</label>
            <textarea placeholder="Briefly describe what you'd like to discuss..."></textarea>
            <label style="margin-top:12px;">Preferred Availability</label>
            <select><option>Morning (9 AM - 12 PM)</option><option>Afternoon (1 PM - 4 PM)</option></select>
          `);
        } else if (text.includes('Read Council News')) {
           showToast('Opening Student Council News...', 'info');
        } else {
          showToast('Navigating to full view...');
        }
      }
    });
  });

  // Header Search Input
  const searchInput = document.querySelector('.header-search input');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        showToast(`Searching for: "${searchInput.value}"`);
        searchInput.value = '';
      }
    });
  }

  // Header Notification Bell
  const notifBtn = document.querySelector('.header-icon-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      showToast('You have 2 new notifications.', 'info');
      const badge = notifBtn.querySelector('.notif-badge');
      if(badge) badge.style.display = 'none';
    });
  }

  /* ==========================================
     3. Dark Mode Toggle
     ========================================== */
  const darkToggle = document.querySelector('input[type="checkbox"]');
  if (darkToggle && darkToggle.closest('div').textContent.includes('Dark Mode')) {
    darkToggle.addEventListener('change', (e) => {
      if (!e.target.checked) {
        showToast('Light mode is still under construction by the design team.', 'warning');
        setTimeout(() => e.target.checked = true, 1000);
      }
    });
  }

  /* ==========================================
     4. Language Integration
     ========================================== */
  const langSelect = document.querySelector('.dash-sidebar__footer select');
  
  // Basic Translation Dictionary for Sidebar & Common UI
  const translations = {
    'Overview': { 'Russian': 'Обзор', 'Uzbek': 'Umumiy ko\'rinish' },
    'Schedule': { 'Russian': 'Расписание', 'Uzbek': 'Dars jadvali' },
    'Grade Book': { 'Russian': 'Оценки', 'Uzbek': 'Baholar' },
    'Campus Map': { 'Russian': 'Карта', 'Uzbek': 'Xarita' },
    'Messages': { 'Russian': 'Сообщения', 'Uzbek': 'Xabarlar' },
    'Language': { 'Russian': 'Язык', 'Uzbek': 'Til' },
    'Dark Mode': { 'Russian': 'Темная тема', 'Uzbek': 'Tungi rejim' },
    'Log Out': { 'Russian': 'Выйти', 'Uzbek': 'Chiqish' },
    'Search courses, news, faculty...': { 'Russian': 'Поиск курсов, новостей...', 'Uzbek': 'Qidirish...' }
  };

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const lang = e.target.value;
      
      if (lang === 'English') {
        window.location.reload(); // Quick reset to English
        return;
      }

      showToast(`Language switched to ${lang}`, 'success');

      // Translate Sidebar Links
      document.querySelectorAll('.dash-nav__link').forEach(link => {
        const textNode = Array.from(link.childNodes).find(node => node.nodeType === 3 && node.textContent.trim().length > 0);
        if (textNode) {
          const originalText = textNode.textContent.trim();
          if (translations[originalText] && translations[originalText][lang]) {
            textNode.textContent = ' ' + translations[originalText][lang];
          }
        }
      });

      // Translate Footer Labels
      document.querySelectorAll('.dash-sidebar__footer span').forEach(span => {
        const originalText = span.textContent.trim();
        if (translations[originalText] && translations[originalText][lang]) {
          span.textContent = translations[originalText][lang];
        }
      });

      // Translate Search Placeholder
      if (searchInput && translations['Search courses, news, faculty...'][lang]) {
         searchInput.placeholder = translations['Search courses, news, faculty...'][lang];
      }

    });
  }

});
