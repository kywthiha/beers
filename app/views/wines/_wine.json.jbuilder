json.extract! wine, :id, :brand, :style, :country, :quantity, :created_at, :updated_at
json.url wine_url(wine, format: :json)
