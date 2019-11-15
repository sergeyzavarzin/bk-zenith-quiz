import React from 'react';
import {
  Panel,
  PanelHeader,
  HeaderButton,
  Div,
  FormLayout,
  Input,
  Button,
  Checkbox,
  Textarea,
  Link,
  Counter,
  FormStatus,
  Group,
  List,
  Cell,
  Avatar
} from '@vkontakte/vkui';
import Icon24BrowserBack from '@vkontakte/icons/dist/24/browser_back';

import {withMarketContext} from '../../context/MarketContext';
import {withAppContext} from '../../context/AppContext';

class Order extends React.Component {

  state = {
    error: false,
  };

  componentDidMount() {
  }

  render() {
    const {id, go, marketContext, appContext} = this.props;
    const {error} = this.state;
    const {selectedMerchItem} = marketContext.state;
    const {user} = appContext.state;
    return (
      <Panel id={id} theme='white'>
        <PanelHeader
          left={
            <HeaderButton
              data-to='market'
              onClick={go}
            >
              <Icon24BrowserBack/>
            </HeaderButton>
          }
        >
          Товар
        </PanelHeader>
        <Group
          title='Вы выбрали'
        >
          <List>
            <Cell
              before={
                <Avatar
                  type='image'
                  src={selectedMerchItem.image}
                />
              }
              description={`${selectedMerchItem.price} баллов` }
            >
              {selectedMerchItem.name}
            </Cell>
          </List>
        </Group>
        <FormLayout>
          {
            error &&
            <FormStatus title='Некорректный мобильный номер' state='error'>
              Необходимо корректно ввести номер в международном формате
            </FormStatus>
          }
          <Input top='Имя' name='firstName' defaultValue={user.first_name}/>
          <Input top='Фамилия' name='lastName' defaultValue={user.last_name}/>
          <Input top='Телефон' name='phone'/>
          <Input
            type='email'
            top='E-mail'
            name='email'
            // value={email}
            onChange={this.onChange}
            // status={email ? 'valid' : 'error'}
            // bottom={email ? 'Электронная почта введена верно!' : 'Пожалуйста, введите электронную почту'}
          />
          <Input top='Страна' name='country' defaultValue={user.country.title}/>
          <Input top='Город' name='city' defaultValue={user.city.title}/>
          <Input top='Телефон' name='address'/>
          <Input top='Почтовый индекс' name='postIndex'/>
          <Textarea top='Пожелания'/>
          <Checkbox>
            Согласен со всем <Link>этим</Link>
          </Checkbox>
          <Button
            level='commerce'
            size='xl'
            after={<Counter>{selectedMerchItem.price}</Counter>}
            data-to='purchases'
            onClick={go}
          >
            Купить
          </Button>
        </FormLayout>
      </Panel>
    )
  }
}

export default withAppContext(withMarketContext(Order));
