import React from 'react';
import moment from 'moment';
import {
  Panel, PanelHeader, HeaderButton,
  FormLayout, Input, Button, Checkbox,
  Textarea, Link, Counter, FormStatus, Group,
  List, Cell, Avatar, Select,
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withMarketContext} from '../../Contexts/MarketContext';
import {withAppContext} from '../../Contexts/AppContext';

import {validateEmail} from '../../Utils/validation';

import {ORDER_STATUSES} from '../../Constants/orderStatuses';
import {MERCH_TYPES} from '../../Constants/merchTypes';
import {AGREEMENT} from '../../Constants/links';

const ERRORS = {
  VALIDATION: {
    title: 'Ошибка заполнения формы',
    body: 'Проверьте форму на наличие ошибок.'
  },
  PRICE: {
    title: 'Недостаточно баллов',
    body: 'Недостаточно баллов для совершения заказа.'
  }
};

class Order extends React.Component {

  state = {
    isValid: true,
    error: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    country: null,
    city: null,
    address: null,
    postIndex: null,
    description: null,
    agreement: false,
    privacy: false,
  };

  static getDerivedStateFromProps(nextProps) {
    const {appContext: {state: {user}}} = nextProps;
    if (user) {
      return {
        firstName: user.first_name,
        lastName: user.last_name,
        country: user.country && user.country.title,
        city: user.city && user.city.title,
      }
    }
  }

  handleChange = e => field => this.setState({[field]: e.currentTarget.value, isValid: true});

  isValid = () => {
    const {firstName, lastName, email, phone, country, city, address, postIndex, description} = this.state;
    return firstName && lastName && phone && country &&
      city && address && postIndex && description && validateEmail(email);
  };

  handleSubmit = e => {
    const {go, marketContext, appContext} = this.props;
    const {state: {userScore, user}, updateUserData} = appContext;
    const {createOrder, fetchMerch, state: {selectedMerchItem}} = marketContext;
    if (userScore < selectedMerchItem.price) {
      this.setState({
        error: ERRORS.PRICE,
        isValid: false
      });
      return false;
    }
    if (selectedMerchItem.type === MERCH_TYPES.PHYSICAL && !this.isValid()) {
      this.setState({
        error: ERRORS.VALIDATION,
        isValid: false
      });
      return false;
    }
    const {
      firstName, lastName, description,
      email, phone, country, city, address, postIndex
    } = this.state;
    const deliveryData = JSON.stringify({email, phone, country, city, address, postIndex});
    const orderCreateCallback = () => {
      updateUserData();
      fetchMerch();
    };
    createOrder(
      `${selectedMerchItem.id}-${user.id}-${moment().format('DD-MM-YYYY-HH-mm-ss')}`,
      user.id, firstName, lastName, selectedMerchItem.id, selectedMerchItem.price,
      moment(), deliveryData, ORDER_STATUSES.CREATED, description || '', orderCreateCallback
    );
    go(e);
  };

  render() {
    const {handleChange, handleSubmit} = this;
    const {id, go, marketContext} = this.props;
    const {isValid, firstName, lastName, country, city, error, agreement, privacy} = this.state;
    const {selectedMerchItem} = marketContext.state;
    const isPhysical = selectedMerchItem.type === MERCH_TYPES.PHYSICAL;
    return (
      <Panel id={id} theme='white'>
        <PanelHeader
          left={
            <HeaderButton data-to='market' onClick={go}>
              <Icon24BrowserBack/>
            </HeaderButton>
          }
        >
          Товар
        </PanelHeader>
        <Group title='Вы выбрали'>
          <List>
            <Cell
              size='l'
              before={<Avatar type='image' src={selectedMerchItem.image}/>}
              description={`${selectedMerchItem.price} баллов`}
              bottomContent={<span>В наличии: {selectedMerchItem.count} шт.</span>}
            >
              <b>{selectedMerchItem.name}</b>
            </Cell>
          </List>
        </Group>
        <FormLayout>
          <Select
            top='Способ доставки'
            value='AT_MATCH'
          >
            <option value='AT_MATCH'>Заберу на домашнем матче</option>
            <option value='POST'>Почтой</option>
            <option value='COURIER'>Курьером по Санкт-Петребургу</option>
          </Select>
          {
            isPhysical &&
            <Input
              top='Имя'
              status={!firstName && !isValid && 'error'}
              defaultValue={!!firstName && firstName}
              onChange={e => handleChange(e)('firstName')}
            />
          }
          {
            isPhysical &&
            <Input
              top='Фамилия'
              defaultValue={!!lastName && lastName}
              onChange={e => handleChange(e)('lastName')}
            />
          }
          {
            isPhysical &&
            <Input
              top='E-mail'
              onChange={e => handleChange(e)('email')}
            />
          }
          {
            isPhysical &&
            <Input
              top='Телефон'
              onChange={e => handleChange(e)('phone')}
            />
          }
          {
            isPhysical &&
            <Input
              top='Страна'
              defaultValue={!!country && country}
              onChange={e => handleChange(e)('country')}
            />
          }
          {
            isPhysical &&
            <Input
              top='Город'
              defaultValue={!!city && city}
              onChange={e => handleChange(e)('city')}
            />
          }
          {
            isPhysical &&
            <Input
              top='Адрес'
              onChange={e => handleChange(e)('address')}
            />
          }
          {
            isPhysical &&
            <Input
              top='Почтовый индекс'
              onChange={e => handleChange(e)('postIndex')}
            />
          }
          {
            isPhysical &&
            <Textarea
              top='Пожелания'
              onChange={e => handleChange(e)('description')}
            />
          }
          {
            !isValid &&
            <FormStatus title={error.title} state='error'>
              {error.body}
            </FormStatus>
          }
          <Checkbox
            onChange={() => this.setState({agreement: !agreement})}
          >
            <div style={{fontSize: 14, marginLeft: -5}}>
              Я согласен на <Link href={AGREEMENT} target='_blank'>обработку персональных данных</Link>
            </div>
          </Checkbox>
          <Checkbox
            onChange={() => this.setState({privacy: !privacy})}
          >
            <div style={{fontSize: 14, marginLeft: -5}}>
              Я ознакомлен с <Link href={AGREEMENT} target='_blank'>пользовательским соглашением</Link>
            </div>
          </Checkbox>
          <Checkbox
            onChange={() => 1}
          >
            <div style={{fontSize: 14, marginLeft: -5}}>
              Хочу получать интересные новости о&nbsp;команде и&nbsp;событиях на&nbsp;электронную почту
            </div>
          </Checkbox>
          <Button
            level='commerce'
            size='xl'
            after={<Counter>{selectedMerchItem.price}</Counter>}
            data-to='purchases'
            onClick={handleSubmit}
            style={(!agreement || !privacy) ? {
              opacity: 0.5,
              pointerEvents: 'none',
              userSelect: 'none',
            } : {}}
          >
            Купить
          </Button>
        </FormLayout>
      </Panel>
    )
  }
}

export default withAppContext(withMarketContext(Order));
