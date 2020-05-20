(function() {
  mixpanel.init("99035923ee0a67880e6c05ab92b6cbc0", { batch_requests: true })
  mixpanel.track('page view', {
  'page title': document.title,
  'page type': 'slideshow'
  });

  function extractDataFromEvent(event) {
    const id = event.currentSlide.id;
    const index = event.indexh;
    let title;
    try {
      title = event.currentSlide.dataset.menuTitle;
    }
    catch (error) {
      console.error(error);
      title = '';
    }
    return {
      'id': id,
      'title': title,
      'index': index
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
      'page index': eventData.index
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
