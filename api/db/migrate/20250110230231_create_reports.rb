class CreateReports < ActiveRecord::Migration[7.2]
  def change
    create_table :reports do |t|
      t.date :reported_at
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
