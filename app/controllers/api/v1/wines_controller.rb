class Api::V1::WinesController < ApplicationController
  before_action :set_beer, only: [:show, :edit, :update, :destroy]

  # GET /beers
  # GET /beers.json
  def index
    @wines = Wine.order(id: :desc).paginate(page: params[:page], per_page: 5)
    render :json => {
      :meta => {
        :current_page => @wines.current_page,
        :per_page => @wines.per_page,
        :total_entries => @wines.total_entries,
      },
      :entries => @wines
    }
  end

  # GET /beers/1
  # GET /beers/1.json
  def show
    if @wine
      render json: @wine
    else
      render json: @wine.errors
    end
  end

  # GET /beers/new
  def new
    @wine = Wine.new
  end

  # GET /beers/1/edit
  def edit
  end

  # POST /beers
  # POST /beers.json
  def create
    @wine = Wine.new(beer_params)

    if @wine.save
      render json: @wine
    else
      render json: @wine.errors
    end
  end

  # PATCH/PUT /beers/1
  # PATCH/PUT /beers/1.json
  def update
  end

  # DELETE /beers/1
  # DELETE /beers/1.json
  def destroy
    @wine.destroy

    render json: { notice: 'Beer was successfully removed.' }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_beer
    @wine = Wine.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def beer_params
    params.permit(:brand, :style, :country, :quantity)
  end
end
