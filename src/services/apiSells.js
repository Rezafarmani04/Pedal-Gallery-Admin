import supabase from './supabase';

export async function getSells() {
  const { data, error } = await supabase.from('sold').select('*');

  if (error) {
    console.error(error);
    throw new Error('خطا در دریافت لیست فروش‌ها');
  }
  return data;
}

export async function createSell(newSell) {
  const { data, error } = await supabase
    .from('sold')
    .insert([newSell])
    .select();

  if (error) {
    console.error(error);
    throw new Error('فروش جدید اضافه نشد');
  }

  return data;
}
