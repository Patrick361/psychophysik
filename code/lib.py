import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy as sc
import ast



def import_data(path):
    df = pd.read_csv(path)
    
    def convert_to_boolean(response_str):
        return eval(response_str.replace('true', 'True').replace('false', 'False'))
    
    boolean_arrays = df['responses'].apply(convert_to_boolean).tolist()
    boolean_np = np.array(boolean_arrays)
    return boolean_np

def calculate_true_probabilities(boolean_np):
    
    true_counts = np.sum(boolean_np, axis=0) #alle True values
    
    probabilities = true_counts / len(boolean_np)
    
    return np.array(probabilities).flatten()


def times(path):
    df = pd.read_csv(path)
    return np.array(df["time"])


def get_name(path):
    df = pd.read_csv(path)
    return np.array(df["name"])

logistic_fkt = lambda x, a, b : 1/(1+np.exp(-b*(x-a)))
lin_fkt =  lambda x,a,b: a*x+b

def chi_square(params, x_data, y_data, y_error):
    a, b = params
    model = logistic_fkt(x_data, a, b)
    chi_square = np.sum((y_data - model)**2 / y_error**2)
    return chi_square


x_lin_global = np.array([2, 5])
y_lin_global = np.array([2.2, 3.7])


def import_data_for_min_treshold(path):
    df = pd.read_csv(path)

    def convert_to_boolean_list(response_str):
        response_list = response_str.strip('[]').split(',')
        return [True if x.strip().lower() == 'true' else False for x in response_list]
    
    df['responses'] = df['responses'].apply(convert_to_boolean_list)
    
    # Convert boolean values (True/False) to 1/0
    boolean_np = df['responses'].apply(lambda x: np.array(x).astype(int)).to_numpy()
    
    return boolean_np
