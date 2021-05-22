export class Modal {
  fallbackText: string;
  contentTemplateEl: HTMLTemplateElement;
  modalTemplateEl: HTMLTemplateElement;
  modalElement: any;
  backdropElement: any;

  constructor(contentId: string, fallbackText: string) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId) as HTMLTemplateElement;
    this.modalTemplateEl = document.getElementById('modal-template') as HTMLTemplateElement;
  }

  show() {
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(this.modalTemplateEl.content, true);
      this.modalElement = modalElements.querySelector('.modal') as HTMLDivElement;
      this.backdropElement = modalElements.querySelector('.backdrop') as HTMLDivElement;
      const contentElement = document.importNode(this.contentTemplateEl.content, true);

      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement('afterbegin', this.modalElement);
      document.body.insertAdjacentElement('afterbegin', this.backdropElement);
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      this.modalElement.remove();
      this.backdropElement.remove();
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}