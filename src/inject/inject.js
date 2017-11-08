function toggleElementClassWithTransition({ toggle, domElement, classNameToApply, transitionStringToApply, delay }) {
  if (domElement.style.transition === transitionStringToApply) domElement.style.transition = '';
  const savedPreviousTransition = domElement.style.transition

  domElement.style.transition = transitionStringToApply

  if (toggle) domElement.classList.add(classNameToApply)
  else domElement.classList.remove(classNameToApply)

  setTimeout(() => {
    domElement.style.transition = savedPreviousTransition
  }, delay)
}

function mount({ DOM_ELEMENT, CLASS_NAME, TRANSITION, DELAY }) {
  chrome.extension.sendMessage({}, response => {
    console.log('message received')
    chrome.storage.local.get('toggle', data => {
      if(!data.toggle) return
      toggleElementClassWithTransition({
        toggle: data.toggle,
        domElement: DOM_ELEMENT,
        classNameToApply: CLASS_NAME,
        transitionStringToApply: TRANSITION,
        delay: DELAY
      })
    })

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName == "local" && changes.toggle) {
        toggleElementClassWithTransition({
          toggle: changes.toggle.newValue,
          domElement: DOM_ELEMENT,
          classNameToApply: CLASS_NAME,
          transitionStringToApply: TRANSITION,
          delay: DELAY
        })
      }
    })
  })
}

mount({
  DOM_ELEMENT: document.body,
  CLASS_NAME: '__chrome-extension-shades__',
  TRANSITION: 'filter 0.2s ease',
  DELAY: 400
})