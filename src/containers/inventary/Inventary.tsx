import { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  inventaryListAction,
  searchListAction,
  searchProcutAction,
  inputInventaryAction
} from '../../redux/actions/inventaryAction';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import InventaryTable from '../../components/inventary/InventaryTable';
import Search from '../../components/inventary/Search';
import Layout from '../../hocs/Layout';
import InventaryTableHead from '../../components/inventary/InventaryTableHead';

const MySwal = withReactContent(Swal);
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

const tableHead: string[] = [
  'Clase',
  'Proveedor',
  'Color',
  'cod. Color',
  'Insomo',
  'Referencia',
  'Talla',
  'U.M',
  'Saldo',
  'C. unidad',
  'C. total',
  'Fecha',
  ''
];

interface searchListState {
  data: any;
  searchListAction(): void;
  searchProcutAction(product: string): void;
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
  inputInventaryAction(id: number, inv_unit_value: number): void;
  search: any;
  search_product: any;
  result: any;
}

const Inventary: FC<searchListState> = (props) => {
  const {
    data,
    searchListAction,
    search,
    searchProcutAction,
    search_product,
    inventaryListAction,
    inputInventaryAction,
    result
  } = props;
  const [inv_provider, setProvider] = useState('' as string);

  const page = data.pages;
  const datas = data.data;

  useEffect(() => {
    window.scrollTo();
    searchListAction();
    inventaryListAction(
      inv_category,
      inv_provider,
      inv_color,
      inv_product,
      inv_size,
      inv_since,
      inv_until,
      pageNext
    );
  }, [inventaryListAction, searchListAction]);

  const [formData, setFormData] = useState({
    inv_category: null,
    inv_provider: null,
    inv_color: null,
    inv_product: null,
    inv_size: null,
    inv_since: null,
    inv_until: null,
    pageNext: null
  } as object);

  const {
    inv_category,
    inv_color,
    inv_product,
    inv_size,
    inv_since,
    inv_until,
    pageNext
  }: any = formData;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePAge = (e: React.ChangeEvent<unknown>, page: number) => {
    const pageNext = page;
    inventaryListAction(
      inv_category,
      inv_provider,
      inv_color,
      inv_product,
      inv_size,
      inv_since,
      inv_until,
      pageNext
    );
  };

  const handleChangeProviver = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    searchProcutAction(e.target.value);
    if (!e.target.value) {
      setFormData({ inv_product: null });
    }

    setProvider(e.target.value);
  };

  const handleClick = async (id: number) => {
    const product = datas
      .filter((data: any) => {
        return data.id === id;
      })
      .map((data: any) => {
        return data.inv_measure + ' de ' + data.inv_product + ' - ' + data.inv_ref;
      });

    const { value: inputVal } = await MySwal.fire({
      title: product,
      input: 'number',
      inputLabel: 'Escribe la cantidad que entra',
      inputPlaceholder: 'Entrada'
    });

    if (inputVal) {
      const inv_unit_value = datas
        .filter((data: any) => {
          return data.id === id;
        })
        .map((data: any) => {
          return parseInt(data.inv_unit_value) + parseInt(inputVal);
        });
      inputInventaryAction(id, parseInt(inv_unit_value));

      Toast.fire({
        icon: 'success',
        title: `Entran  ${inputVal}  ${product} para un total de ${inv_unit_value}`
      });

      //MySwal.fire(`Entran  ${inputVal}  ${product} para un total de ${inv_unit_value}`);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inventaryListAction(
      inv_category,
      inv_provider,
      inv_color,
      inv_product,
      inv_size,
      inv_since,
      inv_until,
      pageNext
    );
  };

  return (
    <Layout>
      <div className="row">
        <Search
          itemSearch={search}
          itemProdcut={inv_provider}
          onChange={handleChange}
          onSubmit={handleOnSubmit}
          searchProduct={search_product}
          onChangeProvider={handleChangeProviver}
        />
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Inventario</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <InventaryTableHead itemsHead={tableHead} />
                  <InventaryTable
                    items={datas}
                    onClick={(id: number) => handleClick(id)}
                  />
                  <tfoot className="container">
                    <div className=" justify-content-end">
                      <Stack spacing={1}>
                        <Pagination
                          onChange={handleChangePAge}
                          count={page}
                          size="small"
                        />
                      </Stack>
                    </div>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.inventaryReducer.data,
  search: state.inventaryReducer.search,
  search_product: state.inventaryReducer.product,
  result: state.inventaryReducer.result
});

export default connect(mapStateToProps, {
  searchListAction,
  searchProcutAction,
  inventaryListAction,
  inputInventaryAction
})(Inventary);
