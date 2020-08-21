(function() {
  mixpanel.init("99035923ee0a67880e6c05ab92b6cbc0", { batch_requests: true })
  mixpanel.track('page view', {
  'page title': document.title,
  'page type': 'slideshow'
  });

  function extractDataFromEvent(event) {
    const id = event.currentSlide.id;
    const index = event.indexh;
    let title = '';
    let language = 'en';
    try {
      title = event.currentSlide.dataset.menuTitle;
      if (window.location.href.includes('/fr/')) {
        language = 'fr'
      }
    }
    catch (error) {
      console.error(error);
    }
    return {
      'id': id,
      'title': title,
      'language': language,
      'index': index,
    };
  }

  /**
   *
   * @param eventData {{id: string, title: string, index: number}}
   */
  function trackSlideViewEvent(eventData) {
    mixpanel.track('slideshow page view', {
      'page id': eventData.id,
      'page title': eventData.title,
      'page index': eventData.index,
      'page language': eventData.language,
    })
  }

  function addRevealEventListener(eventName) {
    Reveal.addEventListener(eventName, event => {
      var eventData = extractDataFromEvent(event);
      trackSlideViewEvent(eventData);
    } );
  }

  addRevealEventListener('ready');
  addRevealEventListener('slidechanged');
}());
/**
 * initializing Mixpanel and sending standard page view
*/
