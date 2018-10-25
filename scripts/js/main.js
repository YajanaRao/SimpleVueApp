'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Todo app structure

TodoApp
	- ChatHeader
	- TodoList
    - ChatListItem #1
		- ChatListItem #2
		  ...
		- ChatListItem #N
	- ChatForm
*/
var todoItems = [];
todoItems.push({ index: 1, output: 'hello', input: "hi", done: false });
todoItems.push({ index: 2, output: 'hello', input: "hello", done: true });

var TodoList = function (_React$Component) {
  _inherits(TodoList, _React$Component);

  function TodoList() {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).apply(this, arguments));
  }

  _createClass(TodoList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var items = this.props.items.map(function (item, index) {
        return React.createElement(ChatListItem, { key: index, item: item, index: index, removeItem: _this2.props.removeItem, markTodoDone: _this2.props.markTodoDone });
      });
      return React.createElement(
        'ul',
        { className: 'list-group' },
        ' ',
        items,
        ' '
      );
    }
  }]);

  return TodoList;
}(React.Component);

var ChatListItem = function (_React$Component2) {
  _inherits(ChatListItem, _React$Component2);

  function ChatListItem(props) {
    _classCallCheck(this, ChatListItem);

    var _this3 = _possibleConstructorReturn(this, (ChatListItem.__proto__ || Object.getPrototypeOf(ChatListItem)).call(this, props));

    _this3.onClickClose = _this3.onClickClose.bind(_this3);
    _this3.onClickDone = _this3.onClickDone.bind(_this3);
    _this3.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    return _this3;
  }

  _createClass(ChatListItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this4 = this;

      console.log(this.props.item.input);
      fetch("http://localhost:5000/project/gethint.php?q=" + this.props.item.input).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this4.setState({
          isLoaded: true,
          items: result,
          output: result
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      function (error) {
        _this4.setState({
          isLoaded: true,
          error: error
        });
      });
    }
  }, {
    key: 'onClickClose',
    value: function onClickClose() {
      var index = parseInt(this.props.index);
      this.props.removeItem(index);
    }
  }, {
    key: 'onClickDone',
    value: function onClickDone() {
      var index = parseInt(this.props.index);
      this.props.markTodoDone(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var todoClass = this.props.item.done ? "done" : "undone";
      var _state = this.state,
          error = _state.error,
          isLoaded = _state.isLoaded,
          items = _state.items;

      if (error) {
        return React.createElement(
          'ul',
          { className: 'list-group' },
          React.createElement(
            'li',
            { className: 'list-group-item ' },
            React.createElement(
              'div',
              { className: todoClass },
              React.createElement('span', { className: 'glyphicon glyphicon-ok icon', 'aria-hidden': 'true', onClick: this.onClickDone }),
              this.props.item.input,
              React.createElement(
                'button',
                { type: 'button', className: 'close', onClick: this.onClickClose },
                '\xD7'
              )
            )
          ),
          React.createElement(
            'li',
            { className: 'list-group-item ' },
            React.createElement(
              'div',
              { className: todoClass },
              error,
              React.createElement(
                'button',
                { type: 'button', className: 'close', onClick: this.onClickClose },
                '\xD7'
              ),
              React.createElement('span', { className: 'glyphicon glyphicon-ok icon', 'aria-hidden': 'true', onClick: this.onClickDone })
            )
          )
        );
      } else if (!isLoaded) {
        console.log("loading");
        return React.createElement(
          'ul',
          { className: 'list-group' },
          React.createElement(
            'li',
            { className: 'list-group-item ' },
            React.createElement(
              'div',
              { className: todoClass },
              React.createElement('span', { className: 'glyphicon glyphicon-ok icon', 'aria-hidden': 'true', onClick: this.onClickDone }),
              this.props.item.input,
              React.createElement(
                'button',
                { type: 'button', className: 'close', onClick: this.onClickClose },
                '\xD7'
              )
            )
          ),
          React.createElement(
            'li',
            { className: 'list-group-item ' },
            React.createElement(
              'div',
              { className: todoClass },
              React.createElement('span', { className: 'glyphicon glyphicon-ok icon', 'aria-hidden': 'true', onClick: this.onClickDone }),
              'loading...',
              React.createElement(
                'button',
                { type: 'button', className: 'close', onClick: this.onClickClose },
                '\xD7'
              )
            )
          )
        );
      } else {
        console.log(items);
        return React.createElement(
          'ul',
          { className: 'list-group' },
          React.createElement(
            'li',
            { className: 'list-group-item ' },
            React.createElement(
              'div',
              { className: todoClass },
              this.props.item.input,
              React.createElement(
                'button',
                { type: 'button', className: 'close', onClick: this.onClickClose },
                '\xD7'
              )
            )
          ),
          React.createElement(
            'li',
            { className: 'list-group-item ' },
            React.createElement(
              'div',
              { className: todoClass },
              items,
              React.createElement(
                'button',
                { type: 'button', className: 'close', onClick: this.onClickClose },
                '\xD7'
              ),
              React.createElement('span', { className: 'glyphicon glyphicon-ok icon', 'aria-hidden': 'true', onClick: this.onClickDone })
            )
          )
        );
      }
    }
  }]);

  return ChatListItem;
}(React.Component);

var TodoForm = function (_React$Component3) {
  _inherits(TodoForm, _React$Component3);

  function TodoForm(props) {
    _classCallCheck(this, TodoForm);

    var _this5 = _possibleConstructorReturn(this, (TodoForm.__proto__ || Object.getPrototypeOf(TodoForm)).call(this, props));

    _this5.onSubmit = _this5.onSubmit.bind(_this5);
    return _this5;
  }

  _createClass(TodoForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.itemName.focus();
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      event.preventDefault();
      var newItemValue = this.refs.itemName.value;

      if (newItemValue) {
        this.props.addItem({ newItemValue: newItemValue });
        this.refs.form.reset();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'form',
        { ref: 'form', onSubmit: this.onSubmit, className: 'form-inline' },
        React.createElement('input', { type: 'text', ref: 'itemName', className: 'form-control', placeholder: 'Send a message...' }),
        React.createElement(
          'button',
          { type: 'submit', className: 'btn btn-default' },
          'Add'
        )
      );
    }
  }]);

  return TodoForm;
}(React.Component);

var ChatHeader = function (_React$Component4) {
  _inherits(ChatHeader, _React$Component4);

  function ChatHeader() {
    _classCallCheck(this, ChatHeader);

    return _possibleConstructorReturn(this, (ChatHeader.__proto__ || Object.getPrototypeOf(ChatHeader)).apply(this, arguments));
  }

  _createClass(ChatHeader, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { 'class': 'w3-card-4 row' },
        React.createElement(
          'div',
          { 'class': 'col-5' },
          React.createElement('img', { src: 'http://localhost:5000/static/image/avatar.png', 'class': 'img-circle center', alt: 'Cinque Terre', width: '40', height: '50' })
        ),
        React.createElement(
          'div',
          { 'class': 'col-7' },
          React.createElement(
            'h3',
            null,
            ' Dumb Chatbot'
          )
        )
      );
    }
  }]);

  return ChatHeader;
}(React.Component);

var ChatBot = function (_React$Component5) {
  _inherits(ChatBot, _React$Component5);

  function ChatBot(props) {
    _classCallCheck(this, ChatBot);

    var _this7 = _possibleConstructorReturn(this, (ChatBot.__proto__ || Object.getPrototypeOf(ChatBot)).call(this, props));

    _this7.addItem = _this7.addItem.bind(_this7);
    _this7.removeItem = _this7.removeItem.bind(_this7);
    _this7.markTodoDone = _this7.markTodoDone.bind(_this7);
    _this7.state = { todoItems: todoItems };
    return _this7;
  }

  _createClass(ChatBot, [{
    key: 'addItem',
    value: function addItem(todoItem) {
      todoItems.push({
        index: todoItems.length + 1,
        output: 'loading..',
        input: todoItem.newItemValue,
        done: false
      });
      this.setState({ todoItems: todoItems });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(itemIndex) {
      todoItems.splice(itemIndex, 1);
      this.setState({ todoItems: todoItems });
    }
  }, {
    key: 'markTodoDone',
    value: function markTodoDone(itemIndex) {
      var todo = todoItems[itemIndex];
      todoItems.splice(itemIndex, 1);
      todo.done = !todo.done;
      todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
      this.setState({ todoItems: todoItems });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'main' },
        React.createElement(ChatHeader, null),
        React.createElement(TodoList, { items: this.props.initItems, removeItem: this.removeItem, markTodoDone: this.markTodoDone }),
        React.createElement(TodoForm, { addItem: this.addItem })
      );
    }
  }]);

  return ChatBot;
}(React.Component);

ReactDOM.render(React.createElement(ChatBot, { initItems: todoItems }), document.getElementById('app'));
