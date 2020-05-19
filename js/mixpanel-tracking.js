/**
 * initializing Mixpanel and sending standard page view
*/

mixpanel.init("99035923ee0a67880e6c05ab92b6cbc0", { batch_requests: true })
mixpanel.track('page view', {
'page title': document.title,
'page type': 'slideshow'
});


window.addEventListener('load', (event) => {
  function trackSlideViewEvent(pageId, pageTitle) {
    mixpanel.track('slideshow page view', {
      'page id': pageId,
      'page title': pageTitle,
    })
  }

  Reveal.addEventListener( 'slidechanged', event => {
    const id = event.currentSlide.id;
    let title;
    try {
      title = event.currentSlide.dataset.menuTitle;
    } catch (error) {
      console.error(error);
      title = '';
    }
    trackSlideViewEvent(id, title);
  } );
});