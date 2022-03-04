Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :wines, only: [:index, :create, :destroy]
    end
  end

  # Defines the root path route ("/")
  root "wines#index"
end
