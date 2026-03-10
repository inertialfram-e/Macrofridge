import { column, Schema, Table } from '@powersync/react-native';

const households = new Table({
  name: 'households',
  columns: [
    column.text('name'),
    column.text('created_at'),
    column.text('updated_at'),
  ],
});

const users = new Table({
  name: 'users',
  columns: [
    column.text('email'),
    column.text('name'),
    column.integer('daily_protein_goal'),
    column.integer('daily_carb_goal'),
    column.integer('daily_fat_goal'),
    column.text('created_at'),
    column.text('updated_at'),
  ],
});

const household_members = new Table({
  name: 'household_members',
  columns: [
    column.text('household_id'),
    column.text('user_id'),
    column.text('role'),
    column.text('created_at'),
  ],
});

const products = new Table({
  name: 'products',
  columns: [
    column.text('barcode'),
    column.text('name'),
    column.text('brand'),
    column.text('macros_per_100g'), // Stored as JSON string
    column.text('created_at'),
    column.text('updated_at'),
  ],
});

const inventory_items = new Table({
  name: 'inventory_items',
  columns: [
    column.text('household_id'),
    column.text('product_id'),
    column.text('custom_name'),
    column.real('quantity'),
    column.text('unit'),
    column.text('purchase_price'),
    column.text('expiration_date'),
    column.integer('use_soon_flag'), // Boolean as integer (0/1)
    column.text('entry_method'),
    column.text('created_at'),
    column.text('updated_at'),
  ],
});

const transactions = new Table({
  name: 'transactions',
  columns: [
    column.text('household_id'),
    column.text('user_id'),
    column.text('vendor_name'),
    column.text('total_amount'),
    column.text('transaction_date'),
    column.text('created_at'),
  ],
});

export const AppSchema = new Schema({
  households,
  users,
  household_members,
  products,
  inventory_items,
  transactions,
});
