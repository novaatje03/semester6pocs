var path = anime.path('#motionPath .circuit path');

var motionPath = anime({
  targets: '#motionPath .car1',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 10000,
  loop: true
});

var motionPath = anime({
  targets: '#motionPath .car2',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 8000,
  loop: true
});

var motionPath = anime({
  targets: '#motionPath .car3',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  easing: 'linear',
  duration: 20000,
  loop: true
});