import numpy as np
from scipy import stats as st


class Statistics:
    @staticmethod
    def calculate(values):
        values = np.array(values)
        mode = st.mode(values) if len(values) else 0
        mean = np.mean(values) if len(values) else 0
        return {
            'mode': round(mode.mode, 2) if len(values) else mode,
            'mean': round(mean, 2)
        }