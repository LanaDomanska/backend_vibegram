export const FeedPostSchema = Yup.object().shape({
  caption: Yup.string()
    .max(2200, 'Описание не может превышать 2200 символов'),
  image: Yup.mixed()
    .required('Выберите изображение')
    .test('fileType', 'Неверный тип файла', value => {
      if (!value) return true;
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      return validTypes.includes(value.type);
    }),
});

