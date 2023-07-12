# Rails.application.routes.draw do
#   namespace :api do
#     namespace :v1 do
#       get 'books/index'
#       get 'books/create'
#       get 'books/show'
#       get 'books/destroy'
#     end
#   end
#   root 'homepage#index'
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Defines the root path route ("/")
#   # root "articles#index"
# end

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'books/index'
      post 'books/create'
      # get '/show/:id', to: 'books#show'
       delete '/destroy/:id', to: 'books#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
