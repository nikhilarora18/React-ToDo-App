import React from 'react';
import './App.scss';

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      draft: ''
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(e: any) {
    this.setState({draft: e.target.value})
  }

  onSubmit(e: any) {
    e.preventDefault();
    if (this.state.draft.length) {
      this.setState((state: any) => ({
        items: state.items.concat({text: state.draft, id: Date.now(), state: 'active'}),
        draft: ''
      }))
    }
  }

  handleDelete(id: number) {
    this.setState((state: any) => ({
      items: state.items.filter((item: any) => {
        return item.id !== id;
      })
    }))
  }

  changeState(id: number, itemState: string) {
    this.setState((state: any) => ({
      items: state.items.map((item: any) => item.id === id ? {...item, state: itemState} : item)
    }))
  }

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="TodoApp">
        <h2>To Do List</h2>
        <ul>
          {this.state.items.filter((item: any) => item.state === 'active').map((item: any) => (<div className="itemRow">
            <li>{item.text}</li>
            <div>
              <button onClick={() => this.handleDelete(item.id)}>Delete</button>
              <button onClick={() => this.changeState(item.id, 'completed')}>Mark as completed</button>
              <button onClick={() => this.changeState(item.id, 'archived')}>Archive</button>
            </div>
          </div>))}
        </ul>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.draft} onChange={this.onValueChange}/>
          <button type="submit">Add #{this.state.items.length + 1}</button>
        </form>
        {this.state.items.filter((item: any) => item.state === 'completed').length > 0 && <div>
            <h3>Completed Items</h3>
            <ul>
              {
                this.state.items.filter((item: any) => item.state === 'completed').map((item: any) => (
                  <li>{item.text}</li>
                ))
              }
            </ul>
        </div>
        }
        {this.state.items.filter((item: any) => item.state === 'archived').length > 0 &&
        <div>
            <h3>Archived Items</h3>
            <ul>
              {
                this.state.items.filter((item: any) => item.state === 'archived').map((item: any) => (
                  <li>{item.text}</li>
                ))
              }
            </ul>
        </div>
        }
      </div>
    );
  }
}

export default App;
