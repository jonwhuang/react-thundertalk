class RecordsController < ApplicationController

  def index
    @records = Record.all
  end

  def create
    @record = Record.new(record_params)

    if @record.save
      render json: @record
    else
      render json: @record.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @record = Record.find(params[:id])
    @record.destroy
    @records = Record.all
    render json: @records
  end

  private

    def record_params
      params.require(:record).permit(:title, :amount, :date)
    end
end
