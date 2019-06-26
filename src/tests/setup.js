import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import localStorage from './__mock__/localStorage';
import Adapter from 'enzyme-adapter-react-16';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.expect = expect;
global.toJson = toJson;
global.moxios = moxios;
global.mockStore = mockStore;
global.localStorage = localStorage;

configure({ adapter: new Adapter() });
