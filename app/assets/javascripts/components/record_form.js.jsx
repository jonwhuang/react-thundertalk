var RecordForm = React.createClass({
  getInitialState: function(){
    return { title: '', date: '', amount: ''}
  },
  handleDateChange: function(e){
    this.setState({date: e.target.value})
  },
  handleTitleChange: function(e){
    this.setState({title: e.target.value})
  },
  handleAmountChange: function(e){
    this.setState({amount: e.target.value})
  },
  handleSubmit: function(e){
    e.preventDefault();
    var date = this.state.date.trim();
    var title = this.state.title.trim();
    var amount = this.state.amount.trim();

    if (!date || !title || !amount){
      return false;
    };
    this.props.onRecordSubmit( {date: date, title: title, amount: amount});
    this.setState({date: '', title: '', amount: ''});
  },
  render: function(){
    return(
      <form className="recordForm" onSubmit={this.handleSubmit} >
        <input type="text" placeholder="Date" value= {this.state.date} onChange= {this.handleDateChange} />
        <input type="text" placeholder="Title" value= {this.state.title} onChange= {this.handleTitleChange} />
        <input type="number" placeholder="Amount" value= {this.state.amount} onChange= {this.handleAmountChange} />
        <input type="submit" value="Create Record" />
      </form>
    );
  }
});
