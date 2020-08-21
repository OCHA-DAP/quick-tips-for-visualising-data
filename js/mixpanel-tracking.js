(function() {
  mixpanel.init("5cbf12bc9984628fb2c55a49daf32e74", { batch_requests: true })
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
