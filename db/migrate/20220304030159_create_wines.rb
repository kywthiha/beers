class CreateWines < ActiveRecord::Migration[7.0]
  def change
    create_table :wines do |t|
      t.string :brand
      t.string :style
      t.string :country
      t.integer :quantity

      t.timestamps
    end
  end
end
