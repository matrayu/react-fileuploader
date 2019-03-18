import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { 
  faFileImage,
  faFileAudio,
  faFileAlt,
  faFileVideo
} from '@fortawesome/free-solid-svg-icons';
import { faRedoAlt, faTrashAlt, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    searchTerm: '',
    filterOption: 'All'
  }

  handleUpdate = (update) => {
    this.setState({ filterOption: update })
  }

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm: searchTerm})
  }

  render() {

    return (
      <div className="App">
        <Searchbar 
          searchTerm={this.state.searchTerm}
          filterOption={this.state.filterOption}
          handleUpdate={this.handleUpdate}
          handleSearch={this.handleSearch}
        />
        <FilterableList
          files={this.props.files}
          searchTerm={this.state.searchTerm}
          filterOption={this.state.filterOption}
        />
      </div>
    );
  }
}

class Searchbar extends Component {
  render() {
    return (
      <div className='SearchBar'>
        <div className='SearchBar__heading'>
          <h1>File Uploader</h1>
        </div>
        <div className='SearchBar_controls'>
          <SearchBox 
            searchTerm={this.props.searchTerm}
            handleSearch={this.props.handleSearch}
          />
          <FilterOptions
            filterOption={this.props.filterOption}
            handleUpdate={this.props.handleUpdate}
          />
        </div>
      </div>
    );
  }
};

class SearchBox extends Component {
  handleSearch = (e) => {
    this.handleSubmit(e.target.value)
  }

  handleSubmit = (searchTerm) => {
    console.log('Submit search for ',searchTerm)
    this.props.handleSearch(searchTerm)
  }
  
  render() {
    return (
      <div className='SearchBox'>
        <FontAwesomeIcon icon={faSearch} />
        <input type='text' placeholder='Search term' value={this.props.searchTerm} onChange={this.handleSearch} />
      </div>
    );
  }
};

class FilterableList extends Component {
  render() {
    const { searchTerm, filterOption } = this.props
    const list = this.props.files.filter(file => 
      file.name.includes(searchTerm) && 
      (filterOption === 'All' || file.status === filterOption))
      .map((file, key) => 
      <ListItem 
        {...file}
        key={key}
      />
    );

    return (
      <div className='FilterableList'>
        {list}   
      </div>
    );
  }
};

FilterableList.defaultProps = {
  files: []
};

class ListItem extends Component {
  render() {

    const icons = {
      "jpg": faFileImage,
      "mov": faFileVideo,
      "txt": faFileAlt,
      "mp3": faFileAudio
    }

    return (
      <div className='ListItem'>
        <div className='ListItem__icon'>
          <div className='ListItem__circle'>
            <FontAwesomeIcon icon={ icons[this.props.fileType] || faFileAlt } />
          </div>
          <div className='ListItem__content'>
            <div className='ListItem__heading'>
              <div className='ListItem__title'>
                {this.props.name}
              </div>
              <div className='ListItem__size'>
                {this.props.size}
              </div>
            </div>
            <div className='ListItem__actions'>
              <div className='ListItem__status'>
                {this.props.status}
              </div>
              <ControlBar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ControlBar extends Component {
  render() {
    return (
      <div className='ControlBar'>
        <div className='ControlBar__btn'>
          <FontAwesomeIcon icon={faRedoAlt} />
        </div>
        <div className='ControlBar__btn'>
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
        <div className='ControlBar__btn'>
          <FontAwesomeIcon icon={faCloudDownloadAlt} />
        </div>
      </div>
    )
  }
}

class FilterOptions extends Component {

  handleFilterSelect = (e) => {
    this.updateFilter(e.target.value)
  }

  updateFilter = (value) => (
    this.props.handleUpdate(value)
  )
  
  render() {

    return (
      <div className='FilterOptions'>
        <div className="FilterOptions__option">
          <label htmlFor="filter_all">
            <input type="radio" value="All" id="filter_all" name="filter" defaultChecked={this.props.filterOption === 'All'} onChange={this.handleFilterSelect} />
          All 
          </label>
        </div>
        <div className="FilterOptions__option">
          <label htmlFor="filter_uploaded">
            <input type="radio" value="Uploaded" id="filter_uploaded" name="filter" defaultChecked={this.props.filterOption === 'Uploaded'} onChange={this.handleFilterSelect} />
          Uploaded
          </label>
        </div>
        <div className="FilterOptions__option">  
          <label htmlFor="filter_synced">
            <input type="radio" value="Synced" id="filter_synced" name="filter" defaultChecked={this.props.filterOption === 'Synced'} onChange={this.handleFilterSelect} />
          Synced
          </label>
        </div>
        <div className="FilterOptions__option">  
          <label htmlFor="filter_new">
            <input type="radio" value="New" id="filter_new" name="filter" defaultChecked={this.props.filterOption === 'New'} onChange={this.handleFilterSelect} />
          New
          </label>
        </div>
      </div>
    );
  }
};




export default App;
