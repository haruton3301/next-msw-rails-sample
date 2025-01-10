class CreateReports < ActiveRecord::Migration[7.2]
  def change
    create_table :reports do |t|
      t.date :date
      t.text :content

      t.timestamps
    end
  end
end
