// Manipulación de imágenes con JavaScript
document
  .getElementById("process-button")
  .addEventListener("click", function () {
    var fileInput = document.getElementById("image-input");
    var imagePreview = document.getElementById("image-preview");

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;

      image.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
          var grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = grayscale;
        }

        ctx.putImageData(imageData, 0, 0);

        var processedImage = new Image();
        processedImage.src = canvas.toDataURL();

        imagePreview.innerHTML = "";

        var originalImageContainer = document.createElement("div");
        originalImageContainer.classList.add("image-container");
        var originalImage = new Image();
        originalImage.src = image.src;
        originalImageContainer.appendChild(originalImage);
        imagePreview.appendChild(originalImageContainer);

        var processedImageContainer = document.createElement("div");
        processedImageContainer.classList.add("image-container");
        processedImageContainer.appendChild(processedImage);
        imagePreview.appendChild(processedImageContainer);
      };
    };

    reader.readAsDataURL(file);
  });
