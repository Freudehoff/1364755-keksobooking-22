const FILE_TYPES = ['png', 'jpeg', 'jpg'];
const HOUSING_PHOTO_WIDTH = 70;
const HOUSING_PHOTO_HEIGHT = 70;

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__image');
const housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const housingPhotoPreview = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

housingPhotoChooser.addEventListener('change', () => {
  const file = housingPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const addPhoto = document.createElement('img');
      housingPhotoPreview.appendChild(addPhoto);
      addPhoto.width = HOUSING_PHOTO_WIDTH;
      addPhoto.height = HOUSING_PHOTO_HEIGHT;
      addPhoto.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
