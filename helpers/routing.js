// eslint-disable-next-line import/prefer-default-export
export async function getRoute(...locs) {
  const routingUrl = 'https://router.project-osrm.org/route/v1/driving';
  // todo: find a way to use axios here.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const waypoints = locs.map(l => l.join(',')).join(';');
    xhr.open(
      'GET',
      `${routingUrl}/${waypoints}?overview=full&steps=false&alternatives=false`,
      true,
    );
    xhr.onload = function onLoad() {
      if (xhr.status === 200) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (e) {
          reject(e);
        }
      } else {
        reject(xhr);
      }
    };
    xhr.onerror = reject;
    xhr.send();
  });
}
