import supabase, { supabaseUrl } from './supabase';

export async function getCars() {
  let query = supabase.from('cars').select('*');

  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('search')) {
    const searchTerm = urlParams.get('search');
    query = query.or(
      `name.ilike.%${searchTerm}%,kind.ilike.%${searchTerm}%,color.ilike.%${searchTerm}%`
    );
  }

  if (urlParams.has('color')) {
    const color = urlParams.get('color');
    query = query.ilike('color', `%${color}%`);
  }

  if (urlParams.has('kind')) {
    const kind = urlParams.get('kind');
    query = query.ilike('kind', `%${kind}%`);
  }

  if (urlParams.has('madeYear')) {
    query = query.eq('madeYear', urlParams.get('madeYear'));
  }

  if (urlParams.has('kmNumber')) {
    const kmNumber = urlParams.get('kmNumber');
    if (kmNumber === '201') {
      query = query.gt('kmNumber', 200);
    } else {
      query = query.lte('kmNumber', kmNumber);
    }
  }

  if (urlParams.has('price')) {
    const price = urlParams.get('price');
    if (price === '3/100') {
      query = query.gt('price', 3);
    } else if (price === '1') {
      query = query.lt('price', 1);
    } else {
      query = query.lte('price', price);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase Error:', error);
    throw new Error('خودرو ها بارگزاری نشدند');
  }

  return data;
}

export async function createCar(newCar, id) {
  const hasImagePath = newCar.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCar.image.name}`.replace('/', '');
  const imagePath = hasImagePath
    ? newCar.image
    : `${supabaseUrl}/storage/v1/object/public/cars-image/${imageName}`;

  let query = supabase.from('cars');

  if (!id) query = query.insert([{ ...newCar, image: imagePath }]);

  if (id) query = query.update({ ...newCar, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('خودرو ایجاد نشد');
  }

  const { error: storageError } = await supabase.storage
    .from('cars-image')
    .upload(imageName, newCar.image);

  if (storageError) {
    await supabase.from('cars').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('عکس خودرو بارگزاری نشد');
  }

  return data;
}

export async function deleteCar(id) {
  const { data, error } = await supabase.from('cars').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('خودرو حذف نشد');
  }

  return data;
}
