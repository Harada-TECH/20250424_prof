document.addEventListener("DOMContentLoaded", () => {
  const quoteEl = document.querySelector('.quote-text');
  if (!quoteEl) return;

  // 元のテキストから引用符を除去して取得
  const originalText = quoteEl.textContent.replace(/“|”/g, '');
  
  // 中身を空にして span で分割して再構築
  quoteEl.innerHTML = '';
  const spans = [];

  for (let i = 0; i < originalText.length; i++) {
    const span = document.createElement('span');
    span.textContent = originalText[i];
    span.classList.add('char');
    span.style.opacity = '0';
    quoteEl.appendChild(span);
    spans.push(span);
  }

  // IntersectionObserver で画面内に入ったらアニメーションをスタート
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        spans.forEach((span, i) => {
          span.style.animation = `fadeIn 0.5s ease forwards`;
          span.style.animationDelay = `${i * 0.05}s`;
        });
        observer.unobserve(quoteEl);
      }
    });
  }, {
    threshold: 0.3 // 30% が表示されたらトリガー
  });

  observer.observe(quoteEl);
});
