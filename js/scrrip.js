// script.js
function downloadTikTokVideo() {
  var tiktokUrl = document.getElementById("tiktokUrl").value;
  var apiUrl =
    "https://api.tiklydown.eu.org/api/download?url=" +
    encodeURIComponent(tiktokUrl);

  fetch(apiUrl, { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((data) => {
      var videoInfo = document.getElementById("videoInfo");
      videoInfo.innerHTML = `
                <img src="${data.author.avatar}" alt="${data.author.name}" width="100">
                <h2>${data.title}</h2>
                <p>${data.author.name}</p>
            `;

      var downloadLink = document.getElementById("downloadLink");
      downloadLink.href = data.video.noWatermark;
      downloadLink.style.display = "block";

      // Extract "created_at" from the response and format it
      var createdAt = data.created_at;
      var formattedCreatedAt = createdAt.replace(/ /g, "_").replace(/:/g, "-");

      // Set the download filename to include the "created_at" value
      downloadLink.download = `arcanist-${formattedCreatedAt}.mp4`;
    })
    .catch((error) => {
      console.error("Gagal mengakses API: " + error);
    });
}
