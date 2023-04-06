// rhf phoneNumberValidation
const isValidPhoneNumber = /((^090)([0-9]))|((^091)([1-9]))|((^070)([1-9]))|((^080)([1-9]))|((^081)([0-9]))(\d{7})/;

export const phoneNumberValidation = {
  required: 'Phone Number is Required',
  maxLength: { value: 11, message: 'Phone Number must be 11 digits' },
  minLength: { value: 11, message: 'Phone Number must be 11 digits' },
  pattern: { value: isValidPhoneNumber, message: 'Invalid Phone Number' },
};

// const handlePostAdvert = (evt, files) => {
//   evt.preventDefault();
//   setLoading(true);
//   console.log('files', files);
//   const uploaders = files.map((file) => {
//     const formData = new FormData();

//     formData.append('file', file.file);
//     formData.append(
//       'upload_preset',
//       process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
//     );

//     // for (const value of formData.values()) {
//     //   console.log(value);
//     // }

//     return axios
//       .post(
//         `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         formData,
//         {
//           headers: { 'X-Requested-With': 'XMLHttpRequest' },
//         }
//       )
//       .then((response) => {
//         const data = response.data;
//         const fileURL = data.secure_url;
//         // console.log('daata', data);
//         // console.log('fileURL advert', fileURL);

//         imgUrlsFromCloudinary.push(fileURL);
//       });
//   });

//   // Once all the files are uploaded
//   axios.all(uploaders).then(() => {
//     // ... perform after upload is successful operation
//     const { itemName, category, itemDescription, quantity, price } =
//       formValues;
//     const payload = {
//       userId,
//       tenantCode,
//       price: `${Number(price) + serviceCharge}`,
//       itemName,
//       itemDescription,
//       category: `${category.charAt(0).toUpperCase()}${category
//         .slice(1)
//         .toLowerCase()}`,
//       quantity,
//       imageUrl: imgUrlsFromCloudinary,
//       phoneNumber: tenantPhone,
//     };

//     postAdvert(setLoading, payload, setSuccess, navigate);
//   });
// };
