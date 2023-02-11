import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Layout from '../../hocs/Layout';
import OutputAdd from '../../components/ouputInventary/OutputAdd';
import { inventaryListAction } from '../../redux/actions/inventaryAction';
import OutputAddList from '../../components/ouputInventary/OutputAddList';
import {
  outputProviderAction,
  searchOutputTypeAction,
  sendOutputTypeAction
} from '../../redux/actions/outputActions';

const MySwal = withReactContent(Swal);
interface outputInventaryState {
  data: any;
  client: any;
  result: any;
  dataInventary: any;
  outputProviderAction(): void;
  inventaryListAction(
    inv_category: string,
    inv_provider: string,
    inv_color: string,
    inv_product: string,
    inv_size: string,
    inv_since: string,
    inv_until: string,
    pageNext: number
  ): void;
  searchOutputTypeAction(client_output: string): void;
  sendOutputTypeAction(client_output: any): void;
}

interface InventaryData {
  inv_order: string;
  inv_invetary: number;
  inv_client: number;
  inv_cout: number;
}

const OutputInevtaryt: FC<outputInventaryState> = (props) => {
  const {
    data,
    client,
    result,
    dataInventary,
    outputProviderAction,
    inventaryListAction,
    searchOutputTypeAction,
    sendOutputTypeAction
  } = props;

  const [formData, setFormData] = useState({
    inv_order: '',
    inv_invetary: 0,
    inv_client: 0,
    inv_cout: 0
  } as InventaryData);

  const { inv_invetary, inv_client, inv_cout, inv_order }: InventaryData = formData;
  const [inv_provider, setProvider] = useState('' as string);
  const [inv_output_type, setOutputType] = useState('' as string);
  const [itemOutputAdd, setItemOutputAdd] = useState();

  useEffect(() => {
    if (result.data === true) {
      MySwal.fire({
        title: 'Bien hecho ',
        icon: 'success',
        text: 'Los productos del inventario estan listos para que salgan'
      });
      result.data = false;
      localStorage.removeItem('inventaryOutput');
      setProvider('');
      setOutputType('');
      setItemOutputAdd(JSON.parse(localStorage.getItem('inventaryOutput') || '[]'));
    }
    window.scrollTo();
    outputProviderAction();
    setItemOutputAdd(JSON.parse(localStorage.getItem('inventaryOutput') || '[]'));
  }, [outputProviderAction, result]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeProviver = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    inventaryListAction('', e.target.value, '', '', '', '', '', 0);
    setProvider(e.target.value);
  };

  const handleChangeoutputType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    searchOutputTypeAction(e.target.value);
    setOutputType(e.target.value);
  };

  const handleDeleteClick = (id: string) => {
    const deleteOutpuy = JSON.parse(localStorage.getItem('inventaryOutput') || '[]');

    const inventaryOutput = deleteOutpuy.filter((data: any) => {
      return data.id.toString() !== id;
    });

    localStorage.setItem('inventaryOutput', JSON.stringify(inventaryOutput));
    setItemOutputAdd(JSON.parse(localStorage.getItem('inventaryOutput') || '[]'));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const invprovider = data.providers.filter((data: any) => {
      return data.pr_name === inv_provider;
    });
    const invoutputtype = data.outputType.filter((data: any) => {
      return data.ot_name === inv_output_type;
    });

    const invinvetary = dataInventary.data.filter((data: any) => {
      return data.id.toString() === inv_invetary;
    });

    const invclient = client.clientOutput.filter((data: any) => {
      return data.id.toString() === inv_client;
    });

    const inventaryOutput = {
      id:
        invprovider[0].id.toString() +
        invoutputtype[0].id.toString() +
        invinvetary[0].id.toString() +
        invclient[0].id.toString(),
      inv_provider_id: invprovider[0].id,
      inv_output_type_id: invoutputtype[0].id,
      inv_invetary_id: invinvetary[0].id,
      inv_client_id: invclient[0].id,
      inv_provider_pr_name: invprovider[0].pr_name,
      inv_output_type_ot_name: invoutputtype[0].ot_name,
      inv_invetary_inv_product: invinvetary[0].inv_product,
      inv_invetary_inv_category: invinvetary[0].inv_category,
      inv_invetary_inv_ref: invinvetary[0].inv_ref,
      inv_invetary_inv_measure: invinvetary[0].inv_measure,
      inv_invetary_inv_color: invinvetary[0].inv_color,
      inv_invetary_inv_size: invinvetary[0].inv_size,
      inv_client_ci_name: invclient[0].ci_name,
      inv_cout: inv_cout,
      inv_order: inv_order
    };

    const inventaryArr = localStorage.getItem('inventaryOutput') || '[]';
    localStorage.setItem(
      'inventaryOutput',
      JSON.stringify([inventaryOutput, ...JSON.parse(inventaryArr)])
    );

    setItemOutputAdd(JSON.parse(localStorage.getItem('inventaryOutput') || '[]'));
  };

  const handleSendOnSubmit = () => {
    const outputInventary = JSON.parse(localStorage.getItem('inventaryOutput') || '[]');
    sendOutputTypeAction(outputInventary);
  };

  return (
    <Layout>
      <OutputAdd
        itemOutput={data}
        itemClient={client}
        searchProduct={dataInventary}
        itemOutputAdd={itemOutputAdd}
        onChange={handleChange}
        onSubmit={handleOnSubmit}
        onChangeoutputType={handleChangeoutputType}
        onChangeProvider={handleChangeProviver}
      />
      <OutputAddList
        itemOutputAdd={itemOutputAdd}
        onClick={(id: string) => handleDeleteClick(id)}
        onSubmit={handleSendOnSubmit}
      />
    </Layout>
  );
};
const mapStateToProps = (state: any) => ({
  data: state.outputReducer.data,
  client: state.outputReducer.client,
  dataInventary: state.inventaryReducer.data,
  result: state.outputReducer.result
});

export default connect(mapStateToProps, {
  inventaryListAction,
  outputProviderAction,
  searchOutputTypeAction,
  sendOutputTypeAction
})(OutputInevtaryt);
