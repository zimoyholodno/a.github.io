
class typeWriting {

  constructor(element) {
    this.element = element;
    this.words = JSON.parse(element.getAttribute('data-words'));
    this.speed = parseInt(element.getAttribute('data-speed'), 10) || 100; 
    this.delay = parseInt(element.getAttribute('data-delay'), 10) || 1000; 
    this.loop = element.getAttribute('data-loop');
    this.char = ''; 
    this.counter = 0; 
    this.isDeleting = false; 
    this.type(); 
  }

  type() {
    
    const index = this.loop === 'yes' ? this.counter % this.words.length : this.counter;
    const fullWord = this.words[index];
    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
      this.char = fullWord.substring(0, this.char.length - 1);
    } else {
      this.char = fullWord.substring(0, this.char.length + 1);
    }
    this.element.innerHTML = `<span class="write">${this.char}</span><span class="blinking-cursor">|</span>`;
    if (!this.isDeleting && this.char === fullWord) {
    if (this.loop === "no" && this.counter >= this.words.length - 1) {
        return;
      }
      this.isDeleting = true;
      typeSpeed = this.delay;
    } else if (this.isDeleting && this.char === '') {
      this.isDeleting = false;
      this.counter++;
    }
    setTimeout(() => this.type(), typeSpeed);

  }

}
document.addEventListener('DOMContentLoaded', init)
function init() {
  document.querySelectorAll('.typewrite').forEach(e => new typeWriting(e));
}
