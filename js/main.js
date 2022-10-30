const headerHeight = $('#header').outerHeight()
const offsetHeight = $(window).width() <= 767 ? 49 : 57

const headerFixed = () => {
  const scrollTop = $(window).scrollTop()
  if (scrollTop > 2 * headerHeight) {
    $('#header').addClass('fixed')
  } else {
    $('#header').removeClass('fixed')
  }
}

const navHighlight = () => {
  $('#nav a').each(function () {
    const href = $(this).attr('href')
    if ($(href).position().top - $(window).scrollTop() <= $(href).outerHeight() / 2) {
      $('#nav a').removeClass('active')
      $(this).addClass('active')
    }
  })
}

$('#nav a').click(function (e) {
  e.preventDefault()
  const href = $(this).attr('href')
  const pos = $(href).offset().top - headerHeight
  $('html,body').animate({ scrollTop: pos }, 600)
})

$('.suspend .back-top').click(function () {
  $('html,body').animate({ scrollTop: '0' }, 600)
})

$(() => {
  headerFixed()
  navHighlight()
})

$(window).scroll(() => {
  headerFixed()
  navHighlight()
})
