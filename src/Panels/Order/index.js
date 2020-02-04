import React from 'react';
import moment from 'moment';
import {
  Panel, PanelHeader, HeaderButton,
  FormLayout, Input, Button, Checkbox,
  Textarea, Counter, FormStatus, Group,
  List, Cell, Avatar, Select,
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withMarketContext} from '../../Contexts/MarketContext';
import {withAppContext} from '../../Contexts/AppContext';

import {validateEmail} from '../../Utils/validation';

import {ORDER_STATUSES} from '../../Constants/orderStatuses';
import {MERCH_TYPES} from '../../Constants/merchTypes';
import {DELIVERY} from '../../Constants/delivery';
import {subscribeUserToEmailNotification} from '../../Services/subscribeUserToEmailNotification';

const ERRORS = {
  VALIDATION: {
    title: 'Ошибка заполнения формы',
    body: 'Проверьте форму на наличие ошибок.'
  },
  PRICE: {
    title: 'Недостаточно баллов',
    body: 'Недостаточно баллов для совершения заказа.'
  },
  EMAIL_SUBSCRIBE: {
    title: 'Укажите E-mail',
    body: 'Укажите валидный удрес электронной почты на которую женаете получать сообщения.'
  }
};

class Order extends React.Component {

  state = {
    isValid: true,
    error: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Российская федерация',
    city: '',
    address: '',
    postIndex: '',
    description: '',
    deliveryType: DELIVERY.MATCH.type,
    isUserWantToNewsSubscribe: false,
    fieldErrors: {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      country: false,
      city: false,
      address: false,
      postIndex: false,
    }
  };

  static getDerivedStateFromProps(nextProps) {
    const {appContext: {state: {user}}} = nextProps;
    if (user) {
      return {
        firstName: user.first_name,
        lastName: user.last_name,
      }
    }
  }

  handleChange = field => ({target: {value}}) => this.setState(prevState => {
    return {
      [field]: value,
      isValid: true,
      fieldErrors: {...prevState.fieldErrors, [field]: false}
    }
  });

  // TODO: VALIDATION!
  isValid = () => {
    const {
      firstName, lastName, email, phone, country,
      city, address, postIndex, deliveryType
    } = this.state;
    this.setState({
      fieldErrors: {
        firstName: !Boolean(firstName),
        lastName: !Boolean(lastName),
        email: !validateEmail(email),
        phone: !Boolean(phone),
        country: !Boolean(country),
        city: !Boolean(city),
        address: !Boolean(address),
        postIndex: !Boolean(postIndex),
      },
    });
    if (deliveryType === DELIVERY.POST.type) {
      return Boolean(firstName && lastName && phone && validateEmail(email) && country && city && address && postIndex)
    } else {
      return Boolean(firstName && lastName && phone && validateEmail(email))
    }
  };

  handleSubmit = e => {
    const {go, marketContext, appContext} = this.props;
    const {
      firstName, lastName, description, deliveryType,
      email, phone, country, city, address, postIndex,
      isUserWantToNewsSubscribe,
    } = this.state;
    const {state: {userScore, user}, updateUserData} = appContext;
    const {state: {selectedMerchItem}, createOrder, fetchMerch} = marketContext;
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
    if (isUserWantToNewsSubscribe && !validateEmail(email)) {
      this.setState({
        error: ERRORS.EMAIL_SUBSCRIBE,
        isValid: false
      });
      return false;
    }
    const deliveryData = JSON.stringify({deliveryType, email, phone, country, city, address, postIndex});
    const orderCreateCallback = () => {
      updateUserData();
      fetchMerch();
    };
    const status = () => {
      if (selectedMerchItem.type === MERCH_TYPES.DIGITAL) return ORDER_STATUSES.DELIVERED;
      if (deliveryType === DELIVERY.MATCH.type) {
        return ORDER_STATUSES.AWAITING_EXTRADITION;
      } else {
        return ORDER_STATUSES.CREATED;
      }
    };
    createOrder(
      `${selectedMerchItem.id}-${user.id}-${moment().format('DD-MM-YYYY-HH-mm-ss')}`,
      user.id, firstName, lastName, selectedMerchItem.id, selectedMerchItem.price,
      moment(), deliveryData, status(), description || '', orderCreateCallback
    );
    if (isUserWantToNewsSubscribe) {
      subscribeUserToEmailNotification(email);
    }
    go(e);
  };

  render() {
    const {handleChange, handleSubmit} = this;
    const {id, go, marketContext} = this.props;
    const {
      isValid, firstName, lastName, city,
      error, isUserWantToNewsSubscribe, deliveryType,
      fieldErrors
    } = this.state;
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
          {
            isPhysical &&
            <Select
              top='Способ доставки'
              defaultValue={DELIVERY.MATCH.type}
              onChange={({target: {value: deliveryType}}) => this.setState({deliveryType})}
            >
              {
                Object.keys(DELIVERY).map(type =>
                  <option
                    key={type}
                    value={DELIVERY[type].type}
                  >
                    {DELIVERY[type].label}
                  </option>
                )
              }
            </Select>
          }
          {
            isPhysical &&
            <Input
              top='Имя'
              status={!firstName && !isValid && 'error'}
              defaultValue={!!firstName && firstName}
              onChange={handleChange('firstName')}
            />
          }
          {
            isPhysical &&
            <Input
              top='Фамилия'
              status={!lastName && !isValid && 'error'}
              defaultValue={!!lastName && lastName}
              onChange={handleChange('lastName')}
            />
          }
          <Input
            top='E-mail'
            onChange={handleChange('email')}
            status={fieldErrors.email ? 'error' : 'default'}
          />
          {
            isPhysical &&
            <Input top='Телефон' onChange={handleChange('phone')} status={fieldErrors.phone ? 'error' : 'default'}/>
          }
          {
            isPhysical && deliveryType === DELIVERY.POST.type &&
            <Input
              top='Страна'
              defaultValue='Российская федерация'
              onChange={handleChange('country')}
              status={fieldErrors.country ? 'error' : 'default'}
            />
          }
          {
            isPhysical && deliveryType === DELIVERY.POST.type &&
            <Input
              top='Город'
              defaultValue={city}
              onChange={handleChange('city')}
              status={fieldErrors.city ? 'error' : 'default'}
            />
          }
          {
            isPhysical && deliveryType === DELIVERY.POST.type &&
            <Input top='Адрес' onChange={handleChange('address')} status={fieldErrors.address ? 'error' : 'default'}/>
          }
          {
            isPhysical && deliveryType === DELIVERY.POST.type &&
            <Input top='Почтовый индекс' onChange={handleChange('postIndex')} status={fieldErrors.postIndex ? 'error' : 'default'}/>
          }
          {
            isPhysical &&
            <Textarea
              top='Комментарий'
              placeholder='Например: размер, цвет и т.д.'
              onChange={handleChange('description')}
            />
          }
          <Checkbox
            onChange={() => this.setState({isUserWantToNewsSubscribe: !isUserWantToNewsSubscribe})}
          >
            <div style={{fontSize: 14, marginLeft: -5}}>
              Хочу получать интересные новости о&nbsp;команде и&nbsp;событиях на&nbsp;электронную почту
            </div>
          </Checkbox>
          {
            !isValid &&
            <FormStatus title={error.title} state={error === ERRORS.EMAIL_SUBSCRIBE ? 'default' : 'error'}>
              {error.body}
            </FormStatus>
          }
          <Button
            level='primary'
            size='xl'
            after={<Counter>{selectedMerchItem.price}</Counter>}
            data-to='purchases'
            onClick={handleSubmit}
          >
            Купить
          </Button>
        </FormLayout>
      </Panel>
    )
  }
}

export default withAppContext(withMarketContext(Order));
