import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import {DogList, DogCard} from './PetApp';
import AdoptPage from './AdoptDog';
import DOG_DATA from './dog-data'; //load the dog data to use

//describe a "test suite" for a particular feature
describe('Basic math and logic', () => {
   //some functionality the feature should have
   it('should have 1+2=3', () => {
     expect(1+2).toEqual(3);
   });
});

describe('<DogList /> component', () => {
  it('should render the Dog Cards', () => {
    const wrapper = shallow(<DogList />);
    expect(wrapper.find(DogCard).length).toEqual(5);
  })

  it('should filter dogs on search', () => {
    const wrapper = shallow(<DogList />);
    wrapper.find('input').simulate('change',{target:{value:'Mix'}});
    expect(wrapper.find(DogCard).length).toEqual(2);
  });

  it('should search by the entered term', () => {
    const searchSpy = sinon.spy(DogList.prototype, 'searchDogs'); //spy for search method
    const wrapper = shallow(<DogList />);
    wrapper.find('input').simulate('change',{target:{value:'Mix'}});
    expect(searchSpy.getCall(0).args[0]).toEqual('Mix');
  })
})

describe('<AdoptPage> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AdoptPage params={{dogName:'Fido'}} />);
  });

  it('should adopt a dog on button click', () => {
    wrapper.find('button').simulate('click');
    expect(DOG_DATA[0].adopted).toEqual(true);
  });

  it('should show dog adopted on button cick', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').text()).toEqual('Already adopted!');
    expect(wrapper.find('button').props().disabled).toEqual(true);
  });
});

