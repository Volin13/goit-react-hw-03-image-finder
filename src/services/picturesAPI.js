import axios from 'axios';

const axiosPixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31497107-74ff97909f7263a3d9824c2c9',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

async function fetchPictures(q, page) {
  const { data } = await axiosPixabay.get('', { params: { q, page } });
  return data;
}

export default fetchPictures;
